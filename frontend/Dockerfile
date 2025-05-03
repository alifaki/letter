# Build Stage
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files first for better caching
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY frontend/ .

# Build Angular app with production configuration
RUN npm run build -- --output-path=dist/letter --configuration=production

# Production Stage
FROM nginx:alpine

# Remove default Nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom Nginx config from root nginx folder
COPY nginx/nginx.conf /etc/nginx/conf.d

# Copy built Angular files
COPY --from=builder /app/dist/letter /usr/share/nginx/html

EXPOSE 80
