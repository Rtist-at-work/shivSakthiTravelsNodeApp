const Tariff = require("../models/tariff.model");

const getTariff = async (req, res) => {

  try {
    const tariffs = await Tariff.find();
    res.status(200).json(tariffs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = getTariff
