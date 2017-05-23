FROM node:4.5

RUN mkdir /application
WORKDIR /application

COPY server.js /application
COPY package.json /application

RUN npm install 

EXPOSE 8080

CMD ["npm", "start"]
