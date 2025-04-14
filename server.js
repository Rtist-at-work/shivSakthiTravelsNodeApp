const https = require('https');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const tariffRoute = require('./routes/tariff.route');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: ['https://shivsakthitravels.com', 'https://www.shivsakthitravels.com','http://localhost:5173'],
  methods: ['GET', 'POST'],
  // allowedHeaders: ['Content-Type', 'Authorization']
}));


// Parse JSON bodies
app.use(express.json());

// Define the tariff route
app.use('/api/tariffs', tariffRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB Connected');
  })
  .catch((err) => {
    console.log('❌ MongoDB Connection Failed:', err);
  });

  const PORT = process.env.PORT

// Load SSL only in production
if (process.env.NODE_ENV === 'production') {
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/shivsakthitravels.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/shivsakthitravels.com/fullchain.pem'),
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`🚀 Production server running at https://shivsakthitravels.com:${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`🚀 Dev server running at http://localhost:${PORT}`);
  });
}