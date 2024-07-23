#!/bin/bash

options=$(getopt -o b: -l ecr,build: -- "$@")

PROCEED_BUILD=0
USE_ECR=0

eval set -- $options

while true; do
  case "$1" in
    -b|--build)
      BUILD_ENV=$2
      PROCEED_BUILD=1
      shift 2;;
    --ecr)
      echo "You must precede AWS IAM settings to use the ecr repository"
      if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
        echo "No environment variable is defined to set AWS IAM --> AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY"
        exit 1
      fi
      USE_ECR=1
      aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID && \
      aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY && \
      aws configure set region ap-northeast-2 && \
      aws configure set output "text"
      shift 1;;
    --)
      shift
      break
  esac
done

SERVICE_NAME=$1
IMAGE_TAG=$2
REGISTRY=$3
PROJECT_NAME=ancean
BUILD_PATH=/$PROJECT_NAME/$SERVICE_NAME
IMAGE_NAME=$PROJECT_NAME-$SERVICE_NAME

if [ "$PROCEED_BUILD" -eq 1 ]; then
  echo """
  Build docker image
  project: $PROJECT_NAME
  service: $SERVICE_NAME
  env: $BUILD_ENV
  tag: $IMAGE_TAG
  result: $IMAGE_NAME:$IMAGE_TAG
  """
  cd $BUILD_PATH && docker image build -t $IMAGE_NAME:$IMAGE_TAG --build-arg APP_ENV=$BUILD_ENV -f Dockerfile.prod .
fi

if [ "$USE_ECR" -eq 1 ]; then
  echo "Docker login to use ECR registry"
  aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $REGISTRY
fi

docker tag $IMAGE_NAME:$IMAGE_TAG $REGISTRY/$IMAGE_NAME:$IMAGE_TAG
docker push $REGISTRY/$IMAGE_NAME:$IMAGE_TAG