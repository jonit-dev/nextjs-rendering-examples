FROM node:14-slim

RUN apt-get update

RUN apt-get install python -y
RUN apt-get install make -y
RUN apt-get install g++ -y

WORKDIR /usr/src/app

# install and cache app dependencies
COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install
 

EXPOSE 3003

CMD ["npm", "run", "dev"]
