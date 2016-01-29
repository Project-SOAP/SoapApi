/**
 * AlertMessageController
 *
 * @description :: Server-side logic for managing Alertmessages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    index: function(req,res){
        var socket = req.socket;
        var io = sails.io;

        // emit to all sockets (aka publish)
        // including yourself
        io.sockets.emit('messageName', {thisIs: 'theMessage'});

        // broadcast to a room (aka publish)
        // excluding yourself, if you're in it
        socket.broadcast.to('roomName').emit('messageName', {thisIs: 'theMessage'});

        // emit to a room (aka publish)
        // including yourself
        io.sockets.in('roomName').emit('messageName', {thisIs: 'theMessage'});

        // Join a room (aka subscribe)
        // If you're in the room already, no problem, do nothing
        // If the room doesn't exist yet, it gets created
        socket.join('roomName');

        // Leave a room (aka unsubscribe)
        // If you're not in the room, no problem, do nothing
        // If the room doesn't exist yet, no problem, do nothing
        socket.leave('roomName');

        // Get all connected sockets in the app
        sails.io.sockets.clients();

        // Get all conneted sockets in the room, "roomName"
        sails.io.sockets.clients('roomName');


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