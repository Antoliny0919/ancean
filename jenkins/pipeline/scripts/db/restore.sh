#!/usr/bin/env bash

usage() {
cat <<EOF
Usage: $(basename "${BASH_SOURCE[0]}") [-h] [-b BACKUP_FILE] -- bucket_path 
        db_container_name target_context

positional arguments:

bucket_path                       Name and subpath of the s3 repository from which to import backup data
db_container_name                 The name of the container to restore. 
target_context                    Specifies the docker context in which the container is located to update
                                  the db data.

optional arguments:

-h, --help                        Print this help and exit
-b BACKUP_FILE,    --backup       Specifies the backup files to import.

EOF
  exit
}

get_backup_from_s3() {
  [[ -z $BACKUP_FILE ]] && BACKUP_FILE=$(aws s3 ls s3://$BUCKET_PATH | tail -1 | awk '{print $4}')
  aws s3 cp s3://${BUCKET_PATH}${BACKUP_FILE} /tmp
  echo "copy backup file ${BACKUP_FILE} --> $DB_CONTAINER_ID:/tmp"
  docker cp /tmp/$BACKUP_FILE $DB_CONTAINER_ID:/tmp
  rm -f /tmp/$BACKUP_FILE
}

mariadb_restore() {
  BACKUP_FILE=$1
  docker exec $DB_CONTAINER_ID sh -c "mariadb --user=ancean --password='$DB_PASS' ancean < /tmp/$BACKUP_FILE"
  success_msg "$DB_CONTAINER_ID apply $BACKUP_FILE data(restore success)!!"
  # API_CONTAINER_ID=$(docker ps --format '{{ .ID }} {{ .Image }}' | grep 'api' | awk '{ print $1 }')
  # docker exec $API_CONTAINER_ID sh -c "python3 manage.py migrate"
}

apply_context() {
  CONTEXT_NAME=$1
  [[ ! $(docker context ls --format '{{ .Name }}' | grep $CONTEXT_NAME) == $CONTEXT_NAME ]] \
  && die "$TARGET_CONTEXT Context that does not exist."
  success_msg "confirmed that the ${TARGET_CONTEXT} context exists."
  docker context use $TARGET_CONTEXT
}

extract_container_id() {
  CONTAINER_NAME=$1
  DB_CONTAINER_ID=$(docker ps --format '{{ .ID }} {{ .Image }}' | grep $DB_CONTAINER_NAME | awk '{ print $1 }')
  [[ -z $DB_CONTAINER_ID ]] && die "No containers with that name ${DB_CONTAINER_NAME} were found."
  success_msg "A container matching the name of the container was found."
  CONTAINER_DETAIL=($(docker ps --format '{{ .ID }}/{{ .Image }}/{{ .Names }}/{{ .State }}' | grep $DB_CONTAINER_ID | tr "/" "\n"))

  echo """
  --------------- Apply Database Restore Container ---------------
  ID:     ${CONTAINER_DETAIL[0]}
  IMAGE:  ${CONTAINER_DETAIL[1]}
  NAMES:  ${CONTAINER_DETAIL[2]}
  STATE:  ${CONTAINER_DETAIL[3]}
  ----------------------------------------------------------------
  """
}

parse_params() {

  eval set -- $options

  while true; do
    case "$1" in
      -h|--help)
        usage
        shift ;;
      -b|--backup)
        BACKUP_FILE=$2
        shift 2;;
      ?)
        exit 1
        ;;
      --)
        shift
        break
    esac
  done

  args=("$@")

  [[ ! ${#args[@]} -eq $REQUIRE_POSITIONAL_ARGUMENTS_CNT ]] && die "Missing script arguments"

  BUCKET_PATH=$1
  DB_CONTAINER_NAME=$2
  TARGET_CONTEXT=$3

  return 0
}

REQUIRE_POSITIONAL_ARGUMENTS_CNT=3
BACKUP_FILE=""
REQUIRE_ENV_VARIABLES=("AWS_ACCESS_KEY_ID" "AWS_SECRET_ACCESS_KEY" "DB_PASS")

source ../base.sh

for env in ${REQUIRE_ENV_VARIABLES[@]}; do
  [[ -z $(env | grep "^${env}=") ]] && die "AWS IAM config(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY), \
db password(DB_PASS) must be set for env variable"
done

# base setting && set AWS IAM to use S3 bucket
source $HOME/my_pipeline/scripts/aws/iam-configure.sh $AWS_ACCESS_KEY_ID $AWS_SECRET_ACCESS_KEY

options=$(getopt -o hb: -l help,backup: -- "$@")

parse_params $options

# When the context option is not used, the default context is used.
apply_context $TARGET_CONTEXT

extract_container_id $DB_CONTAINER_NAME

get_backup_from_s3 $BUCKET_PATH

mariadb_restore $BACKUP_FILE

docker context use $DEFAULT_CONTEXT
