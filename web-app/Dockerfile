FROM node:slim

# Create app directory.
WORKDIR /usr/src/app

COPY build/ ./

RUN npm install

CMD [ "npm", "install -g serve" ]

CMD [ "serve", "-s build -l 9002" ]