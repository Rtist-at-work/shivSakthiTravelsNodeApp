const mongoose = require('mongoose');

const getTariff = async (req, res) => {
  
  const db = mongoose.connection.db;

  if (!db) {
    return res.status(500).json({ message: 'Database not connected yet' });
  }

  try {
    const tariffs = await db.collection('Tarrif').find().toArray(); // ✅ corrected line
    res.status(200).json(tariffs);
  } catch (err) {
    console.error('Error fetching tariffs:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = getTariff;
