/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    loginA: function(req,res){

        var name = req.param('name');
        var password = req.param('password');
        if(!name || !password) return res.json(401,{err:'name and password are required'})
        Admin.findOne({name:name}, function(err,user){
            if(err) console.log(err);
            if(err) return res.json(403, {err:'forbidden'});
            if(!user) return res.json(401,{err:'invalid name or password'});
            Admin.comparePassword(password,user, function(err,valid){
                if(err) console.log(err);
                if(err) return res.json(403, {err:'forbidden'});
                if(!valid)return res.json(401,{err:'invalid name or password'});
                token = JwtHandler.generate({name:user.name,id: user.id});
                user.token = token;
                user.save(function(err){
                    if(err) return res.json(403, {err:'forbidden'});
                    return res.json(
                        {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            token:token
                        }
                    )
                })
            })
        })
    },
    loginD: function(req,res){

        var name = req.param('name');
        var password = req.param('password');
        if(!name || !password) return res.json(401,{err:'name and password are required'})
        Driver.findOne({name:name}, function(err,user){
            if(err) console.log(err);
            if(err) return res.json(403, {err:'forbidden'});
            if(!user) return res.json(401,{err:'invalid name or password'});
            Driver.comparePassword(password,user, function(err,valid){
                if(err) console.log(err);
                if(err) return res.json(403, {err:'forbidden'});
                if(!valid)return res.json(401,{err:'invalid name or password'});
                token = JwtHandler.generate({name:user.name,id: user.id});
                user.token = token;
                user.save(function(err){
                    if(err) return res.json(403, {err:'forbidden'});
                    return res.json(
                        {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            token:token
                        }
                    )
                })
            })
        })
    },
    loginT: function(req,res){

        var name = req.param('name');
        var password = req.param('password');
        if(!name || !password) return res.json(401,{err:'name and password are required'})
        Technician.findOne({name:name}, function(err,user){
            if(err) console.log(err);
            if(err) return res.json(403, {err:'forbidden'});
            if(!user) return res.json(401,{err:'invalid name or password'});
            Technician.comparePassword(password,user, function(err,valid){
                if(err) console.log(err);
                if(err) return res.json(403, {err:'forbidden'});
                if(!valid)return res.json(401,{err:'invalid name or password'});
                token = JwtHandler.generate({name:user.name,id: user.id});
                user.token = token;
                user.save(function(err){
                    if(err) return res.json(403, {err:'forbidden'});
                    return res.json(
                        {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            token:token
                        }
                    )
                })
            })
        })
    },
    refresh: function(req,res){
        var user = req.user || false;

        if(user){
            var decoded = JwtHandler.decode(user.refreshToken);
            if(decoded.name === user.name){
                token = JwtHandler.generate({name:user.name,id: user.id});
                user.token = token;
                user.save(function(err){
                    if(err) return res.json(403, {err:'forbidden'});
                    return res.json(
                        {
                            user: user,
                            token:token
                        }
                    )
                })
            }
        }else{
            return res.json(403, {err:'forbidden'});
        }
    }
};

