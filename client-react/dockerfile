FROM node:alpine as base
WORKDIR '/app'
COPY package*.json ./
RUN npm install
COPY . .

FROM node:alpine as dev
WORKDIR '/app'
COPY --from=base ./app ./
CMD ["npm", "run", "start"]

FROM node:alpine as builder
WORKDIR '/app'
COPY --from=base /app/ /app/
RUN npm run build

FROM nginx as prod
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html