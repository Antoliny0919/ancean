#!/bin/bash

echo "******************************************************"
echo "********** Build/Deploy Stag Env Back Image **********"
echo "******************************************************"

TARGET_PATH=$1
IMAGE_TAG=$2
AWS_ACCESS_KEY_ID=$3
AWS_SECRET_ACCESS_KEY=$4

#pytest

echo "Build Stag Env Back Image"

cd $TARGET_PATH && docker image build -t ancean-back-stag:$IMAGE_TAG --build-arg APP_ENV=stag -f Dockerfile.prod .

docker tag ancean-back-stag:$IMAGE_TAG 339713165736.dkr.ecr.ap-northeast-2.amazonaws.com/ancean-back-stag:$IMAGE_TAG

echo "Configure AWS IAM"

aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID && \
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY && \
aws configure set region "ap-northeast-2" && \
aws configure set output "text"

echo "Deploy Stag Env Back Image"

aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 339713165736.dkr.ecr.ap-northeast-2.amazonaws.com

docker push 339713165736.dkr.ecr.ap-northeast-2.amazonaws.com/ancean-back-stag:$IMAGE_TAG
