#if i want to run only 1 container:
FROM node

WORKDIR /usr/src/app

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 8585

CMD "node" "src/Server/serverInitiator"