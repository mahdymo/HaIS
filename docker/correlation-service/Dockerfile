
FROM node:18-alpine

WORKDIR /app
COPY services/correlation-service/package*.json ./
RUN npm install --only=production

COPY services/correlation-service/ .

EXPOSE 3003
CMD ["npm", "start"]
