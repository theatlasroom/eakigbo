#!/bin/bash

# Read our envvars
source .env

# Runs the eakigbo website and apps
COMPOSE_FILE='docker-compose.yml'

# Check the environment we are running in
while getopts 'e:v' flag; do
  case "${flag}" in
    e) NODE_ENV="${OPTARG}" ;;
    *) error "Unexpected option ${flag}" ; exit 1;;
  esac
done

echo "Starting project $PROJECT as $NODE_ENV"
echo "Checking network $EXTERNAL_NETWORK"

# create the njc network if it doesnt exist
if [ ! "$(docker network ls -q -f name=$EXTERNAL_NETWORK)" ]; then
   # create the network
   echo "Network $EXTERNAL_NETWORK does not exist, creating"
   docker network create "$EXTERNAL_NETWORK"
fi

# start the containers
docker-compose -f $COMPOSE_FILE up --build -d
