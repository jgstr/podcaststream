# Need Dockerfile here to install node js so I can run nightwatch test???
FROM node:slim

# Create app directory. Note: "WORKDIR" keeps you in this directory until explicity changed
WORKDIR /usr/src/e2e

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle test source
COPY e2e .

# I have no idea what to put here to run the tests
CMD [ "npm", "run e2e" ]