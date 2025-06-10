
FROM node:18-alpine

WORKDIR /app
COPY services/policy-service/package*.json ./
RUN npm install --only=production

COPY services/policy-service/ .

EXPOSE 3005
CMD ["npm", "start"]
