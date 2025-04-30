# Build stage
FROM node:23-alpine as builder

WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

RUN npm ci

# Copy the rest of the frontend files
COPY . .

# Run the build
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy nginx.conf from the project root to the Nginx config directory
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built frontend files into Nginx
COPY --from=builder /app/dist/letter /usr/share/nginx/html

EXPOSE 81
