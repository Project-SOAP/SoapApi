/**
 * Created by Hubert on 18/12/2015.
 */
var jwt = require('jsonwebtoken');
module.exports  = {
    generate: function(payload){
        var config  = sails.config
        return jwt.sign(
            payload,
            config.jwt.secret,
            {
                expiresIn: config.jwt.ttl
            }
        )
    },
    verify: function(token,callback){
        var config  = sails.config;
        return jwt.verify(
            token,
            config.jwt.secret,
            {},
            callback
        )
    },
    decode: function(token){
        return jwt.decode(token)
    }
}