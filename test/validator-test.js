const sinon = require('sinon');
const expect = require('chai').expect;
const assert = require('chai').assert;
const needle = require('needle');

const config = require('../config');
const validator = require('../lib/validator');

describe('API key and rate validation', function () {
    it('should return 401 if key is wrong', function(){
        process.env.CLIENT_KEYS = ['key1'];
        var req = {
            query:{
                key:'wrong-key'
            }
        };
        var res = {status: function(){},json: function(){}};
        var json = sinon.spy(res, "json");
        var status = sinon.spy(res, "status");
        validator.validateKey(req,res);
        expect(res.status.args[0]).to.deep.equal([401]);
        expect(res.json.args[0]).to.deep.equal([{
            "status": "401",
            "message": "Invalid credentials"
        }]);
    });
    it('should call next if key is correct', function(){
        process.env.CLIENT_KEYS = ['key1'];
        var req = {
            query:{
                key:'key1'
            }
        };
        var next = sinon.spy();
        validator.validateKey(req, null, next);
        expect(next.called).to.be.true;
    });
});