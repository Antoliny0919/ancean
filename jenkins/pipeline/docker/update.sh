#!/usr/bin/env bash

usage() {
cat <<EOF
Usage: $(basename "${BASH_SOURCE[0]}") [-h] [-c CONTEXT_NAME] [-s STACK_NAME] [--ecr ]
       -- service_name image_tag registry

positional arguments:

service_name                              Specifies the name of the docker stack service.
                                          that will be built when the image is built. --> ancean/service_name
image_tag                                 Tag the image to pull.
registry                                  Specifies the register to pull the image from.

optional arguments:

-h, --help                                Show this help message and exit.
-c CONTEXT_NAME, --context CONTEXT_NAME   Specifies the context to use. The default is the first context.
-s STACK_NAME,   --stack STACK_NAME       Specifies the stack to use. It is only available in docker swarm mode and.
                                          uses the first stack by default.
--ecr                                     Use AWS Elastic Container Registry. This include the process of configure the IAM for use.

EOF
  exit
}

die() {
  local msg=$1
  echo >&2 -e ERROR: $msg
  exit 1
}

login_ecr() {
  bash $HOME/my_pipeline/aws/iam-configure.sh $AWS_ACCESS_KEY_ID $AWS_SECRET_ACCESS_KEY
  aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $REGISTRY
  [[ ! $? -eq 0 ]] && die "AWS ECR docker login fail"
}

parse_params() {

  eval set -- $options

  while true; do
    case "$1" in
      -h|--help)
        usage
        shift ;;
      -c|--context)
        CONTEXT_NAME=$2
        shift 2;;
      -s|--stack)
        STACK_NAME=$2
        shift 2;;
      --ecr)
        USE_ECR=1
        shift ;;
      ?)
        exit 1
        ;;
      --)
        shift
        break
    esac
  done

  SERVICE_NAME=$1
  IMAGE_TAG=$2
  REGISTRY=$3
  PROJECT_NAME=ancean
  IMAGE_NAME=${PROJECT_NAME}-${SERVICE_NAME}
}

options=$(getopt -o hc:s: -l help,context:,stack:,ecr -- "$@")

DEFAULT_CONTEXT=$(docker context ls --format '{{ .DockerEndpoint }} {{ .Name }}' \
| grep 'unix:///var/run/docker.sock' \
| awk '{print $2}')
CONTEXT_NAME=$DEFAULT_CONTEXT
STACK_NAME=$(docker stack ls --format '{{ .Name }}' | head -n1)

parse_params $options

[[ ! $(docker context ls --format '{{ .Name }}' | grep $CONTEXT_NAME) == $CONTEXT_NAME ]] && die "$CONTEXT_NAME Context that does not exist."

docker context use $CONTEXT_NAME

[[ ! $(docker info --format '{{ .Swarm.LocalNodeState }}') == 'active' ]] && die "The currently specified context is not in swarm mode."

[[ $USE_ECR -eq 1 ]] && login_ecr

docker image pull $REGISTRY/$IMAGE_NAME:$IMAGE_TAG

docker service update --image=$REGISTRY/$IMAGE_NAME:$IMAGE_TAG ${STACK_NAME}_${SERVICE_NAME}

# docker container deploy wait time

docker context use $DEFAULT_CONTEXT
