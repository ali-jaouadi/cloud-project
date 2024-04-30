FROM node:14


RUN mkdir -p /opt/app 

WORKDIR /opt/app



COPY Backend/ . 
RUN npm install

RUN npm install

EXPOSE 3000
CMD [ "node", "server.js" ]