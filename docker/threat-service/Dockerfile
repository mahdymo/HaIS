
FROM node:18-alpine

WORKDIR /app
COPY services/threat-service/package*.json ./
RUN npm install --only=production

COPY services/threat-service/ .

EXPOSE 3007
CMD ["npm", "start"]
