#!/usr/bin/env bash

usage() {
cat <<EOF
Usage: $(basename "${BASH_SOURCE[0]}") [-h] [-b IMAGE_BUILD_ARGS] [--ecr] -- service_name image_tag registry

positional arguments:

service_name                          It becomes part of the image name and the path of the service 
                                      that will be built when the image is built. --> ancean/service_name
image_tag                             Specify the docker image tag
registry                              Specify the registry to which the image will be pushed

optional arguments:

-h, --help                            Print this help and exit
-b BUILD_ARGS, --build BUILD_ARGS     Add the process of building a docker image.
                                      The path to build the docker image is ancean/service_name(positional argument)
                                      get a parameter. parameter is used for the docker image --build-args option value.
--ecr                                 Use AWS Elastic Container Registry. This include the process of configure the IAM for use.
EOF
  exit
}

build() {
  echo """
  Build docker image
  project: $PROJECT_NAME
  service: $SERVICE_NAME
  build-args: $IMAGE_BUILD_ARGS
  tag: $IMAGE_TAG
  result: $IMAGE_NAME:$IMAGE_TAG
  """
  docker image build -t $IMAGE_NAME:$IMAGE_TAG --build-arg $IMAGE_BUILD_ARGS -f Dockerfile.prod .
}

parse_params() {

  eval set -- $options

  while true; do
    case "$1" in
      -h|--help)
        usage
        shift ;;
      -b|--build)
        IMAGE_BUILD_ARGS=$2
        BUILD_PROCESS=1
        shift 2;;
      --ecr)
        source $HOME/my_pipeline/scripts/aws/iam-configure.sh $AWS_ACCESS_KEY_ID $AWS_SECRET_ACCESS_KEY
        shift ;;
      ?)
        exit 1
        ;;
      --)
        shift
        break
    esac
  done

  [[ ! $# -eq $REQUIRE_POSITIONAL_ARGUMENTS_CNT ]] && die "All positional arguments are required"

  SERVICE_NAME=$1
  IMAGE_TAG=$2
  REGISTRY=$3
  PROJECT_NAME=ancean
  IMAGE_NAME=${PROJECT_NAME}-${SERVICE_NAME}

  return 0
}

REQUIRE_POSITIONAL_ARGUMENTS_CNT=3

SCRIPT_PATH=$HOME/my_pipeline/scripts

source $SCRIPT_PATH/base.sh && source $SCRIPT_PATH/docker/base.sh

options=$(getopt -o b:h -l ecr,build:,help -- "$@")

parse_params $options

docker context use $DEFAULT_CONTEXT

[[ -v "BUILD_PROCESS" ]] && build $IMAGE_BUILD_ARGS

local_image_check ${IMAGE_NAME}:${IMAGE_TAG}

docker tag $IMAGE_NAME:$IMAGE_TAG $REGISTRY/$IMAGE_NAME:$IMAGE_TAG

docker push $REGISTRY/$IMAGE_NAME:$IMAGE_TAG

registry_image_check $REGISTRY $IMAGE_NAME $IMAGE_TAG



