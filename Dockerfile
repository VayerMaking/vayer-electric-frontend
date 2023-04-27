FROM node:16-alpine

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

ENV NODE_ENV production

RUN npx serve build

EXPOSE 3000

CMD [ "npm", "run", "start" ]



