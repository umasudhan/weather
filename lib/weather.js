const needle = require('needle');
const config = require('../config');
var weather = {
    getWeatherInfo: function(req, res){
        console.log('\n\n\n',config.base_url+'?q=sydney,au&appid=311b096b70cb290ebaa7ac694acecfa3'==='http://api.openweathermap.org/data/2.5/weather?q=sydney,au&appid=311b096b70cb290ebaa7ac694acecfa3', '\n\n\n');
        // needle.get('http://api.openweathermap.org/data/2.5/weather?q=sydney,au&appid=311b096b70cb290ebaa7ac694acecfa3', function(error, response) {
        //TODO add country/city validation here
        const city  = req.query.city;
        const country = req.query.country;
        const url = config.base_url+'?appid='+process.env.API_KEY+'&q='+city+','+country;
        needle.get(url, function(error, response) {
            if (!error && response.statusCode == 200){
                res.json(response.body.weather[0].description)//TODO use _
            }else{
                console.log(error, response);
                res.send(error);
            }
                // console.log(response.body);
        });
    }
};
module.exports = weather;