const validKeys = ['key1','key2', 'key3', 'key4', 'key5']; //TODO replace API keys in request with JWT-token?
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
        next(); //TODO
    }
};

module.exports = validator;