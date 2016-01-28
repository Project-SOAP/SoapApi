/**
 * DriverController
 *
 * @description :: Server-side logic for managing drivers
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

        Driver.update(id, criteria, function(err, user) {

            if (!user) return res.notFound();
            if (err) return next(err);

            return res.json(user);
        });
    },
    subscribeToDriver : function(req,res){
        if(!req.isSocket)return res.json(401,{err:'is not a socket request'});

        console.log('je passe ici dans le contrôleur des drivers')
        Drivers.find().populate('logs').exec(
            function(err,Drivers){
                if(err)return res.error()
                Driver.subscribe(req, _.pluck(Drivers))
                return res.json(Drivers)
            }
        )
    }
};