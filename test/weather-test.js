const sinon = require('sinon');
const expect = require('chai').expect;
const assert = require('chai').assert;
const needle = require('needle');

const config = require('../config');
const weather = require('../lib/weather');
describe('Weather information retrieval', function () {
  it('should retrieve weather info description if key, city and country are correct', function(){
      sinon.stub(needle, "get", function(){
          return {
              "weather": [
                  {
                      "description": "shower rain",
                  }
              ]
          }
      });
      var req = {
        query:{
            city:'city',
            country:'country'
        },
      };
      var res = {send: function(){}};
      var send = sinon.spy(res, "send");
      process.env.API_KEY = 'API_KEY';
      weather.getWeatherInfo(req, res);
      expect(needle.get.getCall(0).args[0]).to.equal('http://api.openweathermap.org/data/2.5/weather?appid=API_KEY&q=city,country');
  });
});