#!/bin/bash

echo "************************************************"
echo "********** Deploy Prod Env Back Image **********"
echo "************************************************"

PROD_IP=$1
IMAGE_TAG=$2
CONTEXT_NAME=prod
IMAGE_NAME=ancean-api
DOCKER_STACK_NAME=ancean
SERVICE_NAME=api

docker context ls | grep $CONTEXT_NAME

if [ ! $? -eq 0 ]; then
  echo "Docker engine in the production environment are not ready for use."
  docker context create $CONTEXT_NAME --docker "host=tcp://$PROD_IP:2375"
fi

docker context use $CONTEXT_NAME

docker image pull 339713165736.dkr.ecr.ap-northeast-2.amazonaws.com/$IMAGE_NAME:$IMAGE_TAG

export BACK_VERSION=$IMAGE_TAG

docker service update --image=339713165736.dkr.ecr.ap-northeast-2.amazonaws.com/$IMAGE_NAME:$IMAGE_TAG ${DOCKER_STACK_NAME}_${SERVICE_NAME}
