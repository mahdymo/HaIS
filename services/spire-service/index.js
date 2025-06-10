
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'spire-service' });
});

// SPIRE components endpoint
app.get('/api/components', (req, res) => {
  res.json({
    data: [
      { name: 'SPIRE Server', status: 'online', count: 1 },
      { name: 'SPIRE Agents', status: 'online', count: 12 },
      { name: 'Workload Entries', status: 'online', count: 47 }
    ]
  });
});

// SPIRE server status endpoint
app.get('/api/server-status', (req, res) => {
  res.json({
    data: { status: 'online', lastSync: '2024-06-10 14:25:33 UTC' }
  });
});

app.listen(PORT, () => {
  console.log(`SPIRE service running on port ${PORT}`);
});
