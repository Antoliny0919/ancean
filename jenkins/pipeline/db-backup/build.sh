#!/bin/bash

echo "***************************************"
echo "********** Build Backup File **********"
echo "***************************************"

DB_PASS=$1
TARGET_FILE=$2

SAVE_FOLDER_PATH=$HOME/ancean/backup

docker exec $(docker ps -q -f name=ancean_db | head -n1) \
sh -c "mariadb-dump --user=ancean --password='$DB_PASS' ancean > /backup/$TARGET_FILE"

if [ ! $? -eq 0 ] || [ ! -f $SAVE_FOLDER_PATH/$TARGET_FILE ]; then
  echo "Backup file build fail"
  exit 1
fi

echo "Backup file build success"
