
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'api-gateway' });
});

// Proxy routes to microservices
app.use('/api/ja4', createProxyMiddleware({
  target: process.env.JA4_SERVICE_URL || 'http://ja4-service:3001',
  changeOrigin: true,
  pathRewrite: { '^/api/ja4': '/api' }
}));

app.use('/api/spire', createProxyMiddleware({
  target: process.env.SPIRE_SERVICE_URL || 'http://spire-service:3002',
  changeOrigin: true,
  pathRewrite: { '^/api/spire': '/api' }
}));

app.use('/api/correlation', createProxyMiddleware({
  target: process.env.CORRELATION_SERVICE_URL || 'http://correlation-service:3003',
  changeOrigin: true,
  pathRewrite: { '^/api/correlation': '/api' }
}));

app.use('/api/identity', createProxyMiddleware({
  target: process.env.IDENTITY_SERVICE_URL || 'http://identity-service:3004',
  changeOrigin: true,
  pathRewrite: { '^/api/identity': '/api' }
}));

app.use('/api/policy', createProxyMiddleware({
  target: process.env.POLICY_SERVICE_URL || 'http://policy-service:3005',
  changeOrigin: true,
  pathRewrite: { '^/api/policy': '/api' }
}));

app.use('/api/alert', createProxyMiddleware({
  target: process.env.ALERT_SERVICE_URL || 'http://alert-service:3006',
  changeOrigin: true,
  pathRewrite: { '^/api/alert': '/api' }
}));

app.use('/api/threat', createProxyMiddleware({
  target: process.env.THREAT_SERVICE_URL || 'http://threat-service:3007',
  changeOrigin: true,
  pathRewrite: { '^/api/threat': '/api' }
}));

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log('Available routes:');
  console.log('  /api/ja4/* -> JA4 Service');
  console.log('  /api/spire/* -> SPIRE Service');
  console.log('  /api/correlation/* -> Correlation Service');
  console.log('  /api/identity/* -> Identity Service');
  console.log('  /api/policy/* -> Policy Service');
  console.log('  /api/alert/* -> Alert Service');
  console.log('  /api/threat/* -> Threat Service');
});
