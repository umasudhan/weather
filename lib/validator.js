const RateLimiter = require("rolling-rate-limiter");
const prettyMs = require('pretty-ms');
const config = require('../config');
if(!process.env.CLIENT_KEYS){
    console.log('Set the client keys as comma separated value of an environment variable named CLIENT_KEYS');
    process.exit(-1);
}
const validKeys = process.env.CLIENT_KEYS.split(',');
const limiter = RateLimiter({
    interval: 60*60*1000, //1 hour in miliseconds
    maxInInterval: config.max_requests_per_hour
});
const validator = {
    validateKey: function(req, res, next){
        if(validKeys.indexOf(req.query.key)===-1){
            res.status(401);
            res.json({"status":"401", "message":"Invalid credentials"});
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
            res.json({"status":"429", "message":"Request limit excceded- try after "+prettyMs(timeLeft)});
        } else {
            next();
            // limit was not exceeded, action should be allowed
        }
    }
};

module.exports = validator;