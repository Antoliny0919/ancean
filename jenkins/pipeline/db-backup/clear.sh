#!/bin/bash

echo "*****************************************"
echo "********** Clear Backup Folder **********"
echo "*****************************************"

BACKUP_FILE_PATH=$HOME/ancean/backup
LIMIT_BACKUP_FILE=50

echo "Backup folder can only have 50 backup files."

BACKUP_FILE_CNT=$(ls $BACKUP_FILE_PATH -l | grep '^-.*\.sql$' | grep 'ancean-backup-*' | wc -l)

if [ $BACKUP_FILE_CNT -lt $LIMIT_BACKUP_FILE ]; then
  echo "There are $BACKUP_FILE_CNT backup files in the current backup folder, so do not clean the backup folder"
  exit 0
fi

EXCESS_BACKUP_FILE=$(expr $BACKUP_FILE_CNT - $LIMIT_BACKUP_FILE)

echo "The backup folder exceeded the limit of $LIMIT_BACKUP_FILE backup files."
echo "Therefore, delete the $EXCESS_BACKUP_FILE excess backup files."

echo -e "Files to be deleted \n$(ls $BACKUP_FILE_PATH -t | tail -$EXCESS_BACKUP_FILE)"

rm -rf $(ls $BACKUP_FILE_PATH -t | tail -$EXCESS_BACKUP_FILE)

echo "Clear backup file finish"
