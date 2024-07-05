#!/bin/bash

echo "**************************************************"
echo "********** Deploy Backup File To AWS S3 **********"
echo "**************************************************"
AWS_ACCESS_KEY_ID=$1
AWS_SECRET_ACCESS_KEY=$2
TARGET_FILE=$3
TRANSFER_DATA_PATH="$HOME/ancean/backup"
BUCKET_PATH="ancean-bucket/backup"

echo "Configure AWS IAM"

aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID && \
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY && \
aws configure set region "ap-northeast-2" && \
aws configure set output "text" 

echo "Deploy backup file > s3://$BUCKET_PATH/$TARGET_FILE"

aws s3 cp $TRANSFER_DATA_PATH/$TARGET_FILE s3://$BUCKET_PATH/$TARGET_FILE
