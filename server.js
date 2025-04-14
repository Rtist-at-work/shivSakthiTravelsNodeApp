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
// app.use(cors({
//   origin: 'https://shivsakthitravels.com', // Allow only your frontend domain
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(cors())

// Parse JSON bodies
app.use(express.json());

// Define the tariff route
app.use('/tariffs', tariffRoute);

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

// // SSL Certificate options (assumes you are using Let's Encrypt certificates)
// const options = {
//   key: fs.readFileSync('/etc/letsencrypt/live/shivsakthitravels.com/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/shivsakthitravels.com/fullchain.pem'),
// };

// Start the HTTPS server
const PORT = process.env.PORT || 5000;
// https.createServer( app).listen(PORT, () => {
//   console.log(`🚀 Backend is running on https://localhost:${PORT}`);
// });


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
