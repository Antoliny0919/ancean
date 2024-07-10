#!/bin/bash

echo "******************************************************"
echo "********** Build/Deploy Stag Env Back Image **********"
echo "******************************************************"

TARGET_PATH=$1
IMAGE_TAG=$2
STAG_SERVER_IP=192.168.1.10

#pytest

echo "Build Stag Env Back Image"

cd $TARGET_PATH && docker image build -t ancean-back-stag:$IMAGE_TAG --build-arg APP_ENV=stag -f Dockerfile.prod .

docker tag ancean-back-stag:$IMAGE_TAG $STAG_SERVER_IP:5000/ancean-back-stag:$IMAGE_TAG

docker push $STAG_SERVER_IP:5000/ancean-back-stag:$IMAGE_TAG

# sshpass -p "vagrant" scp -ri /secrets/prod-key -o StrictHostKeyChecking=no ubuntu@:/home/ubuntu/efs/media vagrant@192.168.1.10:/home/vagrant/prod-data
