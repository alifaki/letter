# Build stage (actually unnecessary, but keeping minimal cleanup)
FROM node:23-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Production stage
FROM node:23-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
# copy entire source code
COPY --from=builder /app ./

EXPOSE 5000
CMD ["node", "app.js"]
