FROM node:18

ENV NODE_OPTIONS ="--unhandled-rejections=strict"

WORKDIR /api

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]