# build environment
FROM node:18.12.0-alpine as react-build
WORKDIR /app
COPY . ./
RUN npm i
RUN npm run build

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 9011
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 9011
CMD ["nginx", "-g", "daemon off;"]
