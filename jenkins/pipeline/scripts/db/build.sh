#!/bin/bash

echo "***************************************"
echo "********** Build Backup File **********"
echo "***************************************"

DB_PASS=$1
TARGET_FILE=$2
PROD_IP=$3

SAVE_FOLDER_PATH=$HOME/ancean/backup
CONTEXT_NAME=prod

docker context ls | grep $CONTEXT_NAME

if [ ! $? -eq 0 ]; then
  echo "Docker engine in the production environment are not ready for use."
  docker context create $CONTEXT_NAME --docker "host=tcp://$PROD_IP:2375"
fi

echo "For database backups, switch to the production environment docker context where the database is running."

docker context use $CONTEXT_NAME

docker exec $(docker ps -q -f name=ancean_db | head -n1) \
sh -c "mariadb-dump --user=ancean --password='$DB_PASS' ancean > /backup/$TARGET_FILE"

if [ ! $? -eq 0 ]; then
  echo "Backup file build fail"
  exit 1
fi

echo "Backup file build success"