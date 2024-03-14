FROM node:14

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN npm install -g serve

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]
