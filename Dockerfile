"Dockerfile" 22L, 417C                                                                                        22,0-1       모두
FROM node:16-alpine3.11

# bash install
RUN apk add bash

# Set the timezone in docker
RUN apk --no-cache add tzdata && \
        cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
        echo "Asia/Seoul" > /etc/timezone

WORKDIR /app

# Only copy the package.json file to work directory
COPY package.json /app
RUN npm install -g npm@7.20.3
RUN npm install

COPY . /app

# Docker Demon Port Mapping
EXPOSE 8000