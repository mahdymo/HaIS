
FROM node:18-alpine

WORKDIR /app
COPY services/spire-service/package*.json ./
RUN npm ci --only=production

COPY services/spire-service/ .

EXPOSE 3002
CMD ["npm", "start"]
