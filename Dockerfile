### STAGE 1: Build ###

### STAGE 2: Setup ###

FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY ./nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY ./dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]



## docker build -t cscfutsal-frontend .
## docker run -p 80:80 cscfutsal-frontend
## docker stop cscfutsal-frontend