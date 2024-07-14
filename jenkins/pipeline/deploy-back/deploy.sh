#!/bin/bash

echo "************************************************"
echo "********** Deploy Stag Env Back Image **********"
echo "************************************************"

IMAGE_TAG=$1
STAG_IP=192.168.1.10
REGISTRY_IP=192.168.1.10
CONTEXT_NAME=stag
IMAGE_NAME=ancean-back-stag
DOCKER_STACK_NAME=ancean
SERVICE_NAME=api

docker context ls | grep $CONTEXT_NAME

if [ ! $? -eq 0 ]; then
  echo "Docker engine in the staging environment are not ready for use."
  docker context create $CONTEXT_NAME --docker "host=tcp://$STAG_IP:2375"
fi

docker context use $CONTEXT_NAME

docker image pull $REGISTRY_IP:5000/$IMAGE_NAME:$IMAGE_TAG

export BACK_VERSION=$IMAGE_TAG

docker service update --image=$REGISTRY_IP:5000/$IMAGE_NAME:$IMAGE_TAG ${DOCKER_STACK_NAME}_${SERVICE_NAME}

