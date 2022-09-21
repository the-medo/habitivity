FROM node:18-alpine AS builder

FROM builder AS frontend

WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

COPY package*.json ./
RUN yarn install

COPY . ./

CMD ["yarn", "run", "dev"]
