const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const tariffRoute = require('./routes/tariff.route');

// Load environment variables
dotenv.config();

const app = express();

// CORS
app.use(cors({
  origin: ['https://shivsakthitravels.com', 'https://www.shivsakthitravels.com','http://localhost:5173',],
  methods: ['GET', 'POST']
}));

// Body parser
app.use(express.json());

// API routes
app.use('/api/tariffs', tariffRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Failed:', err));

// Port
const HTTPS_PORT = 443;
const HTTP_PORT = 80;

// Production environment
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });

  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/shivsakthitravels.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/shivsakthitravels.com/fullchain.pem'),
  };

  https.createServer(options, app).listen(HTTPS_PORT, () => {
    console.log(`🚀 Production HTTPS server running at https://shivsakthitravels.com`);
  });

  http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  }).listen(HTTP_PORT, () => {
    console.log('🌐 HTTP server redirecting to HTTPS');
  });
}
 else {
  // Development mode
  const DEV_PORT = 5000;
  app.listen(DEV_PORT, () => {
    console.log(`🚀 Dev server running at http://localhost:${DEV_PORT}`);
  });
}
