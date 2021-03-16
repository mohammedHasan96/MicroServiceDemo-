FROM node:10-alpine

EXPOSE 3000

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./ 
ENV PATH=/usr/src/app/node_modules/.bin:$PATH
RUN npm install && npm cache clean --force
ENV NODE_ENV=development
COPY . .

CMD ["nodemon", "--exec", "babel-node", "./src/bin/www"]
