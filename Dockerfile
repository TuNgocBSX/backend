FROM node

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm" , "start" ]