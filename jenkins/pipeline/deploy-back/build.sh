#!/bin/bash

echo "***********************************************"
echo "********** Build Stag Env Back Image **********"
echo "***********************************************"

TARGET_PATH=$1
IMAGE_TAG=$2
IMAGE_NAME=ancean-back-stag
REGISTRY_IP=192.168.1.10

#pytest

echo "Build Stag Env Back Image"

cd $TARGET_PATH && docker image build -t $IMAGE_NAME:$IMAGE_TAG --build-arg APP_ENV=stag -f Dockerfile.prod .

docker tag $IMAGE_NAME:$IMAGE_TAG $REGISTRY_IP:5000/$IMAGE_NAME:$IMAGE_TAG

docker push $REGISTRY_IP:5000/$IMAGE_NAME:$IMAGE_TAG

