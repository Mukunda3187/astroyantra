require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const chartRoutes = require('./routes/chartRoutes');
const compatibilityRoutes = require('./routes/compatibilityRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
     origin: "https://astroyantra-frontend.onrender.com"
   }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'pundalik-backend' });
});

app.use('/api/chart', chartRoutes);
app.use('/api/compatibility', compatibilityRoutes);

// In the single-container Docker build, the frontend's production build is copied to
// backend/public and served from the same origin/port as the API (see ../Dockerfile).
// In local dev, this directory doesn't exist and the frontend runs separately via Vite.
const publicDir = path.join(__dirname, '..', 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  // The app uses HashRouter (routes live in the URL fragment after #), so the server
  // never needs to handle client-side routes directly - serving index.html at the root
  // is enough. Anything under /api that reaches here is a genuine 404.
}

app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  if (fs.existsSync(publicDir)) {
    return res.sendFile(path.join(publicDir, 'index.html'));
  }
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`Pundalik backend running on http://localhost:${PORT}`);
});
