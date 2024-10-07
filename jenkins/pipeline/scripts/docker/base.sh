#!/usr/bin/env bash

source $HOME/my_pipeline/scripts/base.sh

DEFAULT_CONTEXT=$(docker context ls --format '{{ .DockerEndpoint }} {{ .Name }}' \
  | grep 'unix:///var/run/docker.sock' \
  | awk '{print $2}')

local_image_check() {
  local FULL_IMAGE=$1
  if ! $(docker image ls --format="{{ .Repository }}:{{ .Tag }}" | grep -x $FULL_IMAGE > /dev/null); then
    die "No image ${FULL_IMAGE} were found to add tags."
  fi
  success_msg "An image was found to add a tag. ${FULL_IMAGE}"
}

registry_image_check() {
  local REGISTRY=$1
  local IMAGE_NAME=$2
  local IMAGE_TAG=$3
  local FULL_IMAGE="${IMAGE_NAME}:${IMAGE_TAG}"
  local FIND_IMAGE_URL="http://${REGISTRY}/v2/${IMAGE_NAME}/tags/list"

  if $(curl -X GET $FIND_IMAGE_URL | jq --arg tag "$IMAGE_TAG" -e IN'(.tags[]; $tag) | not' > /dev/null); then
    die "Image(${FULL_IMAGE}) not found in registry(${REGISTRY})"
  fi
  success_msg "Verified that the image(${FULL_IMAGE}) is saved in the registry(${REGISTRY})!!"
}

pull_image() {
  local REGISTRY=$1
  local IMAGE_NAME=$2
  local IMAGE_TAG=$3
  local PURPOSE_IMAGE="${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
  if [ -v "USE_ECR" ]; then
    aws ecr describe-repositories --output=json --repository-names $IMAGE_NAME
    aws ecr describe-images --output=json --repository-name $IMAGE_NAME  --image-ids imageTag=$IMAGE_TAG
  else 
    registry_image_check $REGISTRY $IMAGE_NAME $IMAGE_TAG
  fi
  docker image pull $PURPOSE_IMAGE
}
