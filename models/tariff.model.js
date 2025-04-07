const mongoose = require('mongoose')

const tariffSchema = new mongoose.Schema({
  district: String,
  kms: Number,
  prices: {
    Sedan: Number,
    SUV: Number,
    Luxury: Number,
    MiniBus: Number,
    TempoTraveller: Number,
  },
});

const tariff = mongoose.model("Tariff", tariffSchema);
module.exports = tariff;
