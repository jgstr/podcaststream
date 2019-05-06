FROM node:slim

# Create app directory.
WORKDIR /usr/src/app

#COPY build/ ./
ADD build ./

RUN npm install -g serve

CMD [ "serve" ]