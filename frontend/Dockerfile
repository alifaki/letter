# Build Stage
FROM node:23-alpine as builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy the Angular source code
COPY frontend/ ./

# Build the Angular app for production
RUN npm run build --prod

# Production Stage
FROM nginx:alpine

# Copy the built Angular app to the Nginx container
COPY --from=builder /app/dist/letter /usr/share/nginx/html

# Copy the Nginx configuration file (ensure this path is correct)
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
