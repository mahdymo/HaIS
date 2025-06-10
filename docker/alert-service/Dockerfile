
FROM node:18-alpine

WORKDIR /app
COPY services/alert-service/package*.json ./
RUN npm ci --only=production

COPY services/alert-service/ .

EXPOSE 3006
CMD ["npm", "start"]
