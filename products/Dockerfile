## Stage 1 (base)
FROM node:10-alpine as base
EXPOSE 3000
ENV NODE_ENV=production
WORKDIR /opt
COPY package*.json ./
RUN npm ci \
  && npm cache clean --force

## Stage 2 (development)
FROM base as dev
ENV NODE_ENV=development
ENV PATH=/opt/node_modules/.bin:$PATH
WORKDIR /opt
RUN npm install --only=development
CMD ["nodemon", "--exec", "babel-node", "./src/bin/www"]

## Stage 3 (production)
FROM base as prod
WORKDIR /opt
COPY . .
RUN npm link
HEALTHCHECK CMD healthcheck
RUN npm run build
CMD ["npm", "start"]


### TODO
# check permissions for files
## docker run --rm -it $(docker build -q .)
