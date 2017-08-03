const needle = require('needle');
const config = require('../config');
const _ = require('lodash');

const weather = {
    getWeatherInfo: function(req, res){
        //TODO add country/city validation here
        const url = getOpenWeatherUrl(req);
        needle.get(url, function(error, response) {
            if (!error && response.statusCode === 200){
                res.send(_.get(response, 'body.weather[0].description'));
            }else{
                console.log(error, response);
                res.status(404);
                res.send('Error retrieving data');
            }
        });
    },


};

function getOpenWeatherUrl(req) {
    const city = req.query.city;
    const country = req.query.country;
    const url = config.base_url + '?appid=' + process.env.API_KEY + '&q=' + city + ',' + country;
    return url;
}

module.exports = weather;