// server/app.js
const express = require('express');
const app = express();
const PORT = 5001;

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});