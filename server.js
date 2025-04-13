const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const tariffRoute = require('./routes/tariff.route');

dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://shivsakthitravels.com/'  // replace with your frontend domain or use '*' to allow all origins (not recommended for production)
}));
app.use(express.json());

app.use('/tariffs', tariffRoute);

// Connect and start server
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB Connected');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log('❌ MongoDB Connection Failed:', err));
