/**
 * AlertMessageController
 *
 * @description :: Server-side logic for managing Alertmessages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    subscribeToAlert : function(req,res){
        if(!req.isSocket)return res.json(401,{err:'is not a socket request'});
        var id = req.param('param')
        console.log('je passe ici dans le controleur des alert messages')
        AlertMessage.find({AlertMessage:id}).exec(
            function(err,AlertMessages){
                if(err)return res.error()
                AlertMessage.subscribe(req, _.pluck(AlertMessages))
                return res.json(AlertMessages)
            }
        )
    }
};