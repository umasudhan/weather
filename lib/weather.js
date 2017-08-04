const needle = require('needle');
const _ = require('lodash');

const config = require('../config');
const countriesCities = require('../countries-cities');

const weather = {
    getWeatherInfo: function(req, res){
        const city = req.query.city? req.query.city.toLowerCase():req.query.city;
        const country = req.query.country?req.query.country.toLowerCase(): req.query.country;
        const validationResult = validateCityAndCountry(city, country);
        if(validationResult.message!=='ok'){
            res.status(400);
            res.json({"status":"400", "message":validationResult.message});
            return;
        }
        const url = getOpenWeatherUrl(city, country);
        needle.get(url, function(error, response) {
            if (!error && response.statusCode === 200){
                res.status(200).send(_.get(response, 'body.weather[0].description'));
            }else{
                console.log(error, response);
                res.status(404).send('Error retrieving data');
            }
        });
    },
};

function getOpenWeatherUrl(city, country) {
    return config.base_url + '?appid=' + process.env.API_KEY + '&q=' + city + ',' + country;
}

function validateCityAndCountry(city, country){
    if(country && countriesCities[country]){
        if(city && countriesCities[country].indexOf(city)!==-1){
            return {message: "ok"}
        }else{
            return {message: "Invalid city " + city + "- pass the full name of a city in "+country.toUpperCase()}
        }
    }else{
        return {message: "Invalid country " + country + "- pass two character ISO-3166 code"}
    }
}

module.exports = weather;