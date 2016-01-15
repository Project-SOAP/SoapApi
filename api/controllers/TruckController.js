/**
 * TruckController
 *
 * @description :: Server-side logic for managing trucks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    subscribeToTechnician : function(req,res){
        if(!req.isSocket)return res.json(401,{err:'is not a socket request'});
        var userId = req.param('userId');
        console.log('je passe ici dans le contrôleur des Technicians')
        Technicians.find({Technician:userId}).populate('logs').exec(
            function(err,Technicians){
                if(err)return res.error()
                Technician.subscribe(req, _.pluck(Technicians,'id'))
                return res.json(Technicians)
            }
        )
    }
};

