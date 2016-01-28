/**
 * TechnicianController
 *
 * @description :: Server-side logic for managing technicians
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // an UPDATE action
    update: function(req, res, next) {
        var criteria = {};
        criteria = _.merge({}, req.params.all(), req.body);

        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Technician.update(id, criteria, function(err, user) {

            if (!user) return res.notFound();
            if (err) return next(err);

            return res.json(user);
        });
    },

    subscribeToTechnician : function(req,res){
        if(!req.isSocket)return res.json(401,{err:'is not a socket request'});

        console.log('je passe ici dans le controleur des locations')
        Technician.find().populate('logs').exec(
            function(err,Technicians){
                if(err)return res.error()
                Technician.subscribe(req, _.pluck(Technicians))
                return res.json(Technicians)
            }
        )
    }
};

