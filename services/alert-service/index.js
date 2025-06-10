
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3006;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'alert-service' });
});

app.listen(PORT, () => {
  console.log(`Alert service running on port ${PORT}`);
});
