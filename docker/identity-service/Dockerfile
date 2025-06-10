
FROM node:18-alpine

WORKDIR /app
COPY services/identity-service/package*.json ./
RUN npm install --only=production

COPY services/identity-service/ .

EXPOSE 3004
CMD ["npm", "start"]
