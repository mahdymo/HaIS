
FROM node:18-alpine

WORKDIR /app
COPY services/ja4-service/package*.json ./
RUN npm ci --only=production

COPY services/ja4-service/ .

EXPOSE 3001
CMD ["npm", "start"]
