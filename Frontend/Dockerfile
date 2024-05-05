# Use the official Node.js 14 image as a base
FROM node:14


RUN mkdir -p /opt/frontend

WORKDIR /opt/frontend



COPY . . 
RUN npm install

RUN npm install

EXPOSE 4200
CMD [ "npm", "start" ]

