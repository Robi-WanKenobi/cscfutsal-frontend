FROM node:alpine

# Create app directory
RUN mkdir /CSCFUTSAL-FRONTEND
WORKDIR /CSCFUTSAL-FRONTEND
COPY package.json /CSCFUTSAL-FRONTEND
RUN cd /CSCFUTSAL-FRONTEND

# If you are building your code for production
# RUN npm install --only=production
RUN npm install

# Bundle app source
COPY ./cscfutsal-frontend /CSCFUTSAL-FRONTEND
RUN ng build --prod

EXPOSE 80
