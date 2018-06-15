FROM node:carbon
LABEL name "my-nodejs-docker-application"
MAINTAINER Juan Pablo Sanchez - Julieth Morales
WORKDIR /app
ADD . /app
RUN npm install
RUN npm install -g nodemon
RUN ls -al /app
EXPOSE 80
CMD ["nodemon", "index.js"]
### CMD ["npm", "start"]