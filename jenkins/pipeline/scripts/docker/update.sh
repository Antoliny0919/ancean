#!/usr/bin/env bash

usage() {
cat <<EOF
Usage: $(basename "${BASH_SOURCE[0]}") [-h] [-c CONTEXT_NAME] [-s STACK_NAME] [--ecr ]
       -- service_name image_tag registry

positional arguments:

service_name                              Specifies the name of the docker stack service.
                                          that will be built when the image is built. --> ancean/service_name
image_tag                                 Tag the image to pull.
registry                                  Specifies the register to pull the image from.

optional arguments:

-h, --help                                Show this help message and exit.
-c CONTEXT_NAME, --context CONTEXT_NAME   Specifies the context to use. The default is the first context.
-s STACK_NAME,   --stack STACK_NAME       Specifies the stack to use. It is only available in docker swarm mode and.
                                          uses the first stack by default.
--ecr                                     Use AWS Elastic Container Registry. This include the process of configure the IAM for use.

EOF
  exit
}

is_swarm_mode() {
  if [ $(docker info --format="{{ .Swarm.LocalNodeState }}") = 'active' ]; then
    success_msg "checked the context(${TARGET_CONTEXT}) is swarm mode."
    return 0
  fi
  die "Context must be swarm mode."
}

select_stack() {
  if [ -v "SPECIFY_STACK_NAME" ]; then
    TARGET_STACK_NAME=$SPECIFY_STACK_NAME
  else
    warning_msg "The requested stack does not exist, so the first stack is used as the default."
    TARGET_STACK_NAME=$(docker stack ls --format '{{ .Name }}' | head -n1)
  fi
}

parse_params() {

  eval set -- $options

  while true; do
    case "$1" in
      -h|--help)
        usage
        shift ;;
      -c|--context)
        TARGET_CONTEXT=$2
        shift 2;;
      -s|--stack)
        SPECIFY_STACK_NAME=$2
        shift 2;;
      --ecr)
        source $HOME/my_pipeline/scripts/aws/iam-configure.sh $AWS_ACCESS_KEY_ID $AWS_SECRET_ACCESS_KEY
        USE_ECR=1
        shift ;;
      ?)
        exit 1
        ;;
      --)
        shift
        break
    esac
  done

  SERVICE_NAME=$1
  IMAGE_TAG=$2
  REGISTRY=$3
  PROJECT_NAME=ancean
  IMAGE_NAME=${PROJECT_NAME}-${SERVICE_NAME}
}

SCRIPT_PATH=$HOME/my_pipeline/scripts

source $SCRIPT_PATH/base.sh && source $SCRIPT_PATH/docker/base.sh

TARGET_CONTEXT=$DEFAULT_CONTEXT

options=$(getopt -o hc:s: -l help,context:,stack:,ecr -- "$@")

parse_params $options

docker context use $TARGET_CONTEXT

is_swarm_mode

select_stack

pull_image $REGISTRY $IMAGE_NAME $IMAGE_TAG

docker service update --image=$REGISTRY/$IMAGE_NAME:$IMAGE_TAG ${TARGET_STACK_NAME}_${SERVICE_NAME}

# docker container deploy wait time

docker context use $DEFAULT_CONTEXT
