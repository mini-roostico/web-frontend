# build stage
FROM node:lts as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf.template

CMD ["nginx", "-g", "daemon off;"]