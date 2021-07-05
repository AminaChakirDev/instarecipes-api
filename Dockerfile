FROM node:alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY tsconfig.json tsconfig.json

COPY ./src ./src

EXPOSE 4000

CMD ["npm", "start"]