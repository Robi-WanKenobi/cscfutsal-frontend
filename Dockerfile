FROM node:10

# Create app directory
RUN mkdir /CSCFUTSAL-FRONTEND
WORKDIR /CSCFUTSAL-FRONTEND
COPY package.json /CSCFUTSAL-FRONTEND
RUN cd /CSCFUTSAL-FRONTEND


# If you are building your code for production
RUN npm install --only=prod
RUN npm install -g @angular/cli@9.0.6

# Bundle app source
COPY . /CSCFUTSAL-FRONTEND
RUN ng build

FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
