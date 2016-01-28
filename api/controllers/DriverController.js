/**
 * DriverController
 *
 * @description :: Server-side logic for managing drivers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    subscribeToDriver : function(req,res){
        if(!req.isSocket)return res.json(401,{err:'is not a socket request'});
        var userId = req.param('userId');
        console.log('je passe ici dans le contrôleur des drivers')
        Drivers.find({driver:userId}).populate('logs').exec(
            function(err,Drivers){
                if(err)return res.error()
                Driver.subscribe(req, _.pluck(Drivers,'id'))
                return res.json(Drivers)
            }
        )
    }
};