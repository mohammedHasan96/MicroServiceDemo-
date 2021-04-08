## Stage 1 (base)
FROM node:12.22.1-alpine3.10 as base
EXPOSE 3000
ENV NODE_ENV=production
WORKDIR /opt
COPY package*.json ./
RUN npm ci \
  && npm cache clean --force

## Stage 2 (development)
FROM base as dev
ENV NODE_ENV=development
WORKDIR /opt
RUN npm install --only=development
ENV PATH /opt/node_modules/.bin:$PATH
CMD ["npm", "run", "dev"]

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
