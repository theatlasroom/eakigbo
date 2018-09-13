#!/bin/bash

# Read our envvars
source .env

# Check the environment we are running in
while getopts 'e:v' flag; do
  case "${flag}" in
    e) NODE_ENV="${OPTARG}" ;;
    *) error "Unexpected option ${flag}" ; exit 1;;
  esac
done

echo "Starting project $PROJECT as $NODE_ENV"
echo "Checking network $EXTERNAL_NETWORK"

# set the compose file based on the environment we are using
COMPOSE_FILE="docker-compose.yml"
if [[ $NODE_ENV = "production" ]]; then
  echo "Yeah boiiii, lets get this started 🔥🔥🔥"
  COMPOSE_FILE="production.yml"
fi

# create the njc network if it doesnt exist
if [ ! "$(docker network ls -q -f name=$EXTERNAL_NETWORK)" ]; then
   # create the network
   echo "Network $EXTERNAL_NETWORK does not exist, creating"
   docker network create "$EXTERNAL_NETWORK"
fi

echo "Use $COMPOSE_FILE to start app in $NODE_ENV env"

# start the containers
if [[ $NODE_ENV = "production" ]]; then
  docker-compose -f $COMPOSE_FILE up --build -d
else
  docker-compose -f $COMPOSE_FILE up --build
fi
