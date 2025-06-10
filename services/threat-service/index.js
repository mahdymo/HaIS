
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3007;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'threat-service' });
});

app.listen(PORT, () => {
  console.log(`Threat service running on port ${PORT}`);
});
