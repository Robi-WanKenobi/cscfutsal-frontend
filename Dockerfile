FROM node:10

# Create app directory
RUN mkdir /CSCFUTSAL-FRONTEND
WORKDIR /CSCFUTSAL-FRONTEND
COPY package.json /CSCFUTSAL-FRONTEND
RUN cd /CSCFUTSAL-FRONTEND

RUN npm install -g @angular/cli@9.0.6

# If you are building your code for production
RUN npm install --production

# Bundle app source
COPY . /CSCFUTSAL-FRONTEND
RUN ng build --prod --output-path=dist

FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
