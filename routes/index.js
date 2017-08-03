const express = require('express');
const router = express.Router();
const weather = require('../lib/weather');
const validator = require('../lib/validator');

router.get('/weather', validator.validateKey, validator.validateRate, weather.getWeatherInfo );

module.exports = router;
