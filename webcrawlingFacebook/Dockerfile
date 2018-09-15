FROM node:10-alpine

ADD . src/

WORKDIR /src

RUN npm install --silent

RUN npm i -g typescript

CMD [ "node", "index.js" ]
