FROM node:alpine

# Create app directory
RUN mkdir /CSCFUTSAL-FRONTEND
WORKDIR /CSCFUTSAL-FRONTEND
COPY package.json /CSCFUTSAL-FRONTEND
RUN cd /CSCFUTSAL-FRONTEND

# If you are building your code for production
# RUN npm install --only=production
RUN npm install
RUN npm install -g @angular/cli

# Bundle app source
COPY . /CSCFUTSAL-FRONTEND
RUN ng build --prod --output-path=dist

FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
