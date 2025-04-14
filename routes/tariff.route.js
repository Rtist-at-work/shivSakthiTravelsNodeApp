const express = require('express')
const getTariff = require('../controller/tariff.controller')

const router = express.Router();
// Get all tariffs
router.get('/', getTariff)

module.exports =  router;
