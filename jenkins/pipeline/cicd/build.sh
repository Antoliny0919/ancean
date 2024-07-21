#!/bin/bash

BUILD_ENV=$1
SERVICE_NAME=$2
REGISTRY=$3
IMAGE_TAG=$4
PROJECT_NAME=ancean
BUILD_TARGET_PATH=/$PROJECT_NAME/$SERVICE_NAME
IMAGE_NAME=$PROJECT_NAME-$SERVICE_NAME

echo "********** Build $BUILD_ENV Env $(echo $SERVICE_NAME | tr '[:lower:]' '[:upper:]') Image **********"

case $BUILD_ENV in 
  stag)
    echo "STAG env use local registry"
    cd $BUILD_TARGET_PATH && docker image build -t $IMAGE_NAME:$IMAGE_TAG --build-arg APP_ENV=$BUILD_ENV -f Dockerfile.prod .
    docker push $REGISTRY/$IMAGE_NAME:$IMAGE_TAG
  ;;
  prod)
    echo "PROD env use ECR"
    echo "Configure AWS IAM"

    AWS_ACCESS_KEY_ID=$5
    AWS_SECRET_ACCESS_KEY=$6

    aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID && \
    aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY && \
    aws configure set region "ap-northeast-2" && \
    aws configure set output "text"

    aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $REGISTRY
  ;;
esac

echo ""

docker tag $IMAGE_NAME:$IMAGE_TAG $REGISTRY/$IMAGE_NAME:$IMAGE_TAG
docker push $REGISTRY/$IMAGE_NAME:$IMAGE_TAG

