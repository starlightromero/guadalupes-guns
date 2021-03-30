FROM node:lts-alpine

LABEL decription="Production image for Guadalupe's Guns."

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]