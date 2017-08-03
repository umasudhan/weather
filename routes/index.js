var express = require('express');
var router = express.Router();
var weather = require('../lib/weather');
var validator = require('../lib/validator');

router.get('/weather', validator.validateKey, validator.validateRate, weather.getWeatherInfo );

module.exports = router;
