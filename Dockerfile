FROM node:18-alpine
WORKDIR /app
COPY /build /usr/share/nginx/html
COPY /nginx-config/conf.d/nginx.conf:/etc/nginx/conf.d/default.conf
EXPOSE 3000
