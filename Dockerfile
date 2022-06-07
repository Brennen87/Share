# base image
FROM node:10.16.3 as build

# set working directory
WORKDIR /app

# set variables
ARG ENVIRONMENT
ARG DEV_BASE_URL
ARG DEV_API_URL
ARG DEV_SOCKET_URL
ARG STRIPE_API_KEY

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent
COPY . /app
RUN REACT_APP_ENVIRONMENT=${ENVIRONMENT} \
    REACT_APP_DEV_BASE_URL=${DEV_BASE_URL} \
    REACT_APP_DEV_API_URL=${DEV_API_URL} \
    REACT_APP_DEV_SOCKET_URL=${DEV_SOCKET_URL} \
    REACT_APP_STRIPE_API_KEY=${STRIPE_API_KEY} \
    npm run build

# production environment
FROM nginx:1.17.4-alpine
COPY --from=build /app/build /var/www
COPY docker/docker_frontend.conf /etc/nginx/conf.d/default.conf
COPY docker/.htpasswd /etc/nginx/.htpasswd
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]