#!/bin/sh

export AUTH_HOST=${AUTH_HOST:-localhost}
export AUTH_PORT=${AUTH_PORT:-8180}
export API_HOST=${API_HOST:-localhost}
export API_PORT=${API_PORT:-3000}

envsubst '${AUTH_HOST} ${AUTH_PORT} ${API_HOST} ${API_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec nginx -g "daemon off;"