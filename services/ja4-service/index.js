
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'ja4-service' });
});

// JA4+ fingerprints endpoint
app.get('/api/fingerprints', (req, res) => {
  res.json({
    data: [
      { id: 1, ja4: 't13d1516h2_8daaf6152771_b0da82dd1658', source: '10.0.1.25', risk: 'low' },
      { id: 2, ja4: 't13d1517h2_9ebbf7263882_c1eb93ee2769', source: '192.168.1.45', risk: 'medium' },
      { id: 3, ja4: 't13d1518h2_afccf8374993_d2fc04ff3870', source: '10.0.2.33', risk: 'high' }
    ]
  });
});

// JA4+ metrics endpoint
app.get('/api/metrics', (req, res) => {
  res.json({
    data: { packets: 1247, fingerprints: 23 }
  });
});

app.listen(PORT, () => {
  console.log(`JA4 service running on port ${PORT}`);
});
