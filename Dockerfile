FROM node:18.3.0
WORKDIR /api
COPY package*.json ./
RUN yarn 
COPY . . 
ENV NODE_PATH=/src