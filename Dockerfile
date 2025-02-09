FROM node:lts as vue-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable
COPY --from=vue-build /app/dist /usr/share/nginx/html

EXPOSE 80

COPY ./nginx.conf /etc/nginx/nginx.conf.template

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]