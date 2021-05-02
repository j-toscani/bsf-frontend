FROM node:lts-buster-slim

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

COPY . .

RUN npm ci

ENV NODE_ENV production

RUN npm run build

EXPOSE 3000:3000

CMD ["npm", "start"]