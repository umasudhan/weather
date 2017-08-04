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
            city:'melbourne',
            country:'au'
        },
      };
      var res = {send: function(){}};
      var send = sinon.spy(res, "send");
      process.env.API_KEY = 'API_KEY';
      weather.getWeatherInfo(req, res);
      //actually a test of the getOpenWeatherUrl function
      expect(needle.get.getCall(0).args[0]).to.equal('http://api.openweathermap.org/data/2.5/weather?appid=API_KEY&q=melbourne,au');
  });
    it('should return proper message for invalid country', function(){
        var req = {
            query:{
                city:'city',
                country:'aud'
            },
        };
        var res = {status: function(){},json: function(){}};
        var json = sinon.spy(res, "json");
        var status = sinon.spy(res, "status");
        process.env.API_KEY = 'API_KEY';
        weather.getWeatherInfo(req, res);
        expect(res.status.args[0]).to.deep.equal([400]);
        expect(res.json.args[0]).to.deep.equal([{
            "status": "400",
            "message": "Invalid country aud- pass two character ISO-3166 code"
        }]);
    });
    it('should return proper message for invalid city', function(){
        var req = {
            query:{
                city:'wrong-city',
                country:'au'
            },
        };
        var res = {status: function(){},json: function(){}};
        var json = sinon.spy(res, "json");
        var status = sinon.spy(res, "status");
        process.env.API_KEY = 'API_KEY';
        weather.getWeatherInfo(req, res);
        expect(res.status.args[0]).to.deep.equal([400]);
        expect(res.json.args[0]).to.deep.equal([{
            "status": "400",
            "message": "Invalid city wrong-city- pass the full name of a city in AU"
        }]);
    });

});