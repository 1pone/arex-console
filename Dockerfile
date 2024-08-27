FROM node:20-alpine3.19 AS base

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm i
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start"]
