# Build stage
FROM node:23-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the nginx.conf from the frontend directory
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built frontend into the Nginx container
COPY --from=builder /app/dist/letter /usr/share/nginx/html

EXPOSE 81
