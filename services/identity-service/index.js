
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'identity-service' });
});

app.listen(PORT, () => {
  console.log(`Identity service running on port ${PORT}`);
});
