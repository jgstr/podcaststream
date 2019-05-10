FROM node:slim

# Create app directory.
WORKDIR /usr/src/app

ADD build ./
COPY serve.json .

RUN npm install -g serve

CMD [ "serve" ]