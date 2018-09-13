FROM node:9-alpine

WORKDIR /usr/app

# add util linux, parceljs requires 'lscpu'
# https://github.com/gliderlabs/docker-alpine/issues/207
RUN apk update
RUN apk add util-linux
RUN apk add yarn
RUN yarn

# copy app files
COPY . .
