/**
 * AlertMessageController
 *
 * @description :: Server-side logic for managing Alertmessages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    subscribeToAlert : function(req,res){
        if(!req.isSocket)return res.json(401,{err:'is not a socket request'});
        var userId = req.param('userId');
        console.log('je passe ici dans le controleur des locations')
        AlertMessages.find({alertMessage:userId}).populate('logs').exec(
            function(err,AlertMessages){
                if(err)return res.error()
                AlertMessage.subscribe(req, _.pluck(AlertMessages,'id'))
                return res.json(AlertMessages)
            }
        )
    }
};

