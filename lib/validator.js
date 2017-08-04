const RateLimiter = require("rolling-rate-limiter");

const config = require('../config');

const validKeys = ['key1','key2', 'key3', 'key4', 'key5']; //TODO replace API keys in request with JWT-token?
const limiter = RateLimiter({
    interval: 60*60*1000, //1 hour in miliseconds
    maxInInterval: config.max_requests_per_hour
});
const validator = {
    validateKey: function(req, res, next){
        if(validKeys.indexOf(req.query.key)===-1){
            res.status(401);
            res.json({"status":"401", "message":"invalid credentials"});
            return;
        }
        next();
    },
    validateRate: function(req, res, next){
        const timeLeft = limiter(req.query.key);
        if (timeLeft > 0) {
            // limit was exceeded, action should not be allowed
            // timeLeft is the number of ms until the next action will be allowed
            res.status(429);
            res.json({"status":"429", "message":"Request limit excceded- try after "+(timeLeft/1000)+"s"});
        } else {
            next();
            // limit was not exceeded, action should be allowed
        }
    }
};

module.exports = validator;