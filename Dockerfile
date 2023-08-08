FROM node:16-alpine

WORKDIR /app

COPY package.json package.json

RUN npm install --legacy-peer-deps

COPY . .

# ENV NODE_ENV production

# RUN npm run build --production
RUN npm install sharp --legacy-peer-deps
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]



