FROM node:slim

# Create app directory.
WORKDIR /usr/src/broadcast-server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . ./

CMD [ "node", "broadcast-server" ]