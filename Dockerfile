FROM node:10 AS builder

# Create app directory
COPY . ./CSCFUTSAL-FRONTEND
WORKDIR /CSCFUTSAL-FRONTEND

# If you are building your code for production
RUN npm install --only=prod
RUN $(npm bin)/ng build --prod

FROM nginx:1.16.0-alpine
COPY --from=build /CSCFUTSAL-FRONTEND/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
