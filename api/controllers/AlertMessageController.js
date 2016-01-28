/**
 * AlertMessageController
 *
 * @description :: Server-side logic for managing Alertmessages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    subscribeToAlert : function(req,res){
        if(!req.isSocket)return res.json(401,{err:'is not a socket request'});

        console.log('je passe ici dans le controleur des locations')
        AlertMessages.find().populate('logs').exec(
            function(err,AlertMessages){
                if(err)return res.error()
                AlertMessage.subscribe(req, _.pluck(AlertMessages))
                return res.json(AlertMessages)
            }
        )
    }
};

