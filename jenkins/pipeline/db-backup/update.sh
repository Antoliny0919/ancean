#!/usr/bin/env bash

CONTEXT_NAME=$1

[[ ! $(docker context ls --format '{{ .Name }}' | grep $CONTEXT_NAME) == $CONTEXT_NAME ]] && die "$CONTEXT_NAME Context that does not exist."

docker context use $CONTEXT_NAME

DB_CONTAINER_ID=$(docker ps --format '{{ .ID }} {{ .Image }}' | grep 'mariadb' | awk '{ print $1 }')

# AWS CONFIGURE



DB_BACKUP_NAME=$(aws s3 ls s3://ancean-bucket/backup/ | tail -1 | awk '{print $4}')

aws s3 cp s3://ancean-bucket/backup/$DB_BACKUP_NAME /tmp

docker cp /tmp/$DB_BACKUP_NAME $DB_CONTAINER_ID:/tmp

rm -f /tmp/$DB_BACKUP_NAME

docker exec $DB_CONTAINER_ID sh -c "mariadb --user=ancean --password='$DB_PASS' ancean < /tmp/$BACKUP_FILE"

API_CONTAINER_ID=$(docker ps --format '{{ .ID }} {{ .Image }}' | grep 'api' | awk '{ print $1 }')

docker exec $API_CONTAINER_ID sh -c "python3 manage.py migrate"

docker context use default

