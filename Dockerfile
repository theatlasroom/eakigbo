FROM node:9.8-alpine

WORKDIR /usr/app

# add util linux, parceljs requires 'lscpu'
# https://github.com/gliderlabs/docker-alpine/issues/207
RUN apk add --update util-linux

# copy app files
COPY . .
RUN npm install
RUN npm install -g parcel
