/**
 * AlertMessageController
 *
 * @description :: Server-side logic for managing Alertmessages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    find: function(req, res) {
        var id = req.param('id');
        var idShortCut = isShortcut(id);

        if (idShortCut === true) {
            return next();
        }

        if (id) {
            console.log(id);
            AlertMessage.findOne(id, function(err, alertMessage) {


                if (alertMessage === undefined) return res.notFound();

                if (err) return res.json(err);
                AlertMessage.subscribe(req, _.pluck(AlertMessages,'id'))
                return res.json(AlertMessages)
                sails.log(alertMessage)
                return res.jsonx(alertMessage);
            });
        } else {
            var where = req.param('where');

            if (_.isString(where)) {
                where = JSON.parse(where);
            }

            var options = {
                limit: req.param('limit') || undefined,
                skip: req.param('skip') || undefined,
                sort: req.param('sort') || undefined,
                where: where || undefined
            };

            AlertMessage.find(options, function(err, alertMessage) {

                if (alertMessage === undefined) return res.notFound();
                if (err) return next(err);

                return res.json(alertMessage);
            });
        }

        function isShortcut(id) {
            if (id === 'find' || id === 'update' || id === 'create' || id === 'destroy') {
                return true;
            }
        }
    },
    
    subscribeToAlert : function(req,res){
        if(!req.isSocket)return res.json(401,{err:'is not a socket request'});
        var id = req.param('id')
        console.log('je passe ici dans le controleur des alert messages')
        AlertMessage.find({AlertMessage:id}).exec(
            function(err,AlertMessages){
                if(err)return res.error()
                AlertMessage.subscribe(req, _.pluck(AlertMessages,'id'))
                return res.json(AlertMessages)
            }
        )
    }
};