#!/usr/bin/env bash

REQUIRE_POSITIONAL_ARGUMENTS_CNT=3

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

die() {
  local msg=$1
  echo >&2 -e $msg
  exit 1
}

parse_params() {

  eval set -- $options

  echo $options

  while true; do
    case "$1" in
      -h|--help)
        usage
        shift ;;
      -b|--build)
        PROCEED_BUILD=1
        IMAGE_BUILD_ARGS=$2
        shift 2;;
      --ecr)
        USE_ECR=1
        bash $HOME/my_pipeline/aws/iam-configure.sh $AWS_ACCESS_KEY_ID $AWS_SECRET_ACCESS_KEY
        aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $REGISTRY
        [[ ! $? -eq 0 ]] && die "AWS ECR docker login fail"
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
  BUILD_PATH=/${PROJECT_NAME}/${SERVICE_NAME}
  IMAGE_NAME=${PROJECT_NAME}-${SERVICE_NAME}

  return 0
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
  cd $BUILD_PATH && docker image build -t $IMAGE_NAME:$IMAGE_TAG --build-arg $IMAGE_BUILD_ARGS -f Dockerfile.prod .
}

options=$(getopt -o b:h -l ecr,build:,help -- "$@")

parse_params $options

[[ $PROCEED_BUILD -eq 1 ]] && build

docker context use default
docker tag $IMAGE_NAME:$IMAGE_TAG $REGISTRY/$IMAGE_NAME:$IMAGE_TAG
docker push $REGISTRY/$IMAGE_NAME:$IMAGE_TAG

