#!/usr/bin/env bash

set -Eeuo pipefail

trap cleanup SIGINT SIGTERM ERR EXIT

die() {
  local msg=$1
  echo >&2 -e "${RED}Error: $msg${NOFORMAT}"
  exit 1
}

cleanup() {
  trap - SIGINT SIGTERM ERR EXIT
}

success_msg() {
  local msg=$1
  echo >&2 -e "${GREEN}Success: $msg${NOFORMAT}"
}

warning_msg() {
  local msg=$1
  echo >&2 -e "${ORANGE}Warning: $msg${NOFORMAT}"
}

setup_colors() {
  if [[ -t 2 ]] && [[ -z "${NO_COLOR-}" ]] && [[ "${TERM-}" != "dumb" ]]; then
    NOFORMAT='\033[0m' RED='\033[0;31m' GREEN='\033[0;32m' ORANGE='\033[0;33m' BLUE='\033[0;34m' PURPLE='\033[0;35m' CYAN='\033[0;36m' YELLOW='\033[1;33m'
  else
    NOFORMAT='' RED='' GREEN='' ORANGE='' BLUE='' PURPLE='' CYAN='' YELLOW=''
  fi
}

setup_colors
