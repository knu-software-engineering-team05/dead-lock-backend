FROM node:21

WORKDIR /deadlock/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install bcrypt
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:dev"]