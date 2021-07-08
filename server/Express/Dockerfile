FROM node:latest

RUN mkdir -p /app/server

WORKDIR /app/server

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3000
EXPOSE 5000

CMD [ "yarn","run","dev" ]