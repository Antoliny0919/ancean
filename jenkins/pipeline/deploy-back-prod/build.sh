#!/bin/bash

echo "***********************************************"
echo "********** Build Prod Env Back Image **********"
echo "***********************************************"

AWS_ACCESS_KEY_ID=$1
AWS_SECRET_ACCESS_KEY=$2
IMAGE_TAG=$3
STAG_REGISTRY_IP=192.168.1.10
IMAGE_NAME=ancean-api

echo "Configure AWS IAM"

aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID && \
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY && \
aws configure set region "ap-northeast-2" && \
aws configure set output "text"

aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 339713165736.dkr.ecr.ap-northeast-2.amazonaws.com

echo "Send staging environment api image to AWS ECR"

docker tag $STAG_REGISTRY_IP:5000/$IMAGE_NAME:$IMAGE_TAG 339713165736.dkr.ecr.ap-northeast-2.amazonaws.com/$IMAGE_NAME:$IMAGE_TAG
docker push 339713165736.dkr.ecr.ap-northeast-2.amazonaws.com/$IMAGE_NAME:$IMAGE_TAG