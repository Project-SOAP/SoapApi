/**
 * AlertMessageController
 *
 * @description :: Server-side logic for managing Alertmessages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {






        // emit to all sockets (aka publish)
        // including yourself
        //io.sockets.emit('messageName', {thisIs: 'theMessage'});

        // broadcast to a room (aka publish)
        // excluding yourself, if you're in it
        sendGeneral: function(){
            socket.broadcast.to('room').emit('messageName', {thisIs: 'theMessage'});
        },

        // emit to a room (aka publish)
        // including yourself
        send: function(res){
            var io = sails.io;
            io.sockets.in('Alert Message').emit('messageName', res);
        },
        // Join a room (aka subscribe)
        // If you're in the room already, no problem, do nothing
        // If the room doesn't exist yet, it gets created
        join: function(req,res){
            var io = sails.io;
            var socket = req.socket;

            socket.join('Alert Message');

            console.log('Je passe dans le join d\'alert');
            res.json({
                success: true
            });
        },
        // Leave a room (aka unsubscribe)
        // If you're not in the room, no problem, do nothing
        // If the room doesn't exist yet, no problem, do nothing
        quit: function(req,res){
            var socket = req.socket;
            console.log('je quitte la room');
            socket.leave('Alert Message');
        },

        // Get all connected sockets in the app
        //sails.io.sockets.clients();

        // Get all conneted sockets in the room, "room"
        //sails.io.sockets.clients('room');

        update: function(req, res, next) {
            var criteria = {};
            criteria = _.merge({}, req.params.all(), req.body);

            var id = req.param('id');

            if (!id) {
                return res.badRequest('No id provided.');
            }

            AlertMessage.update(id, criteria, function(err, user) {

                if (!user) return res.notFound();
                if (err) return next(err);

                send(res.json);
                return res.json(user);
            });
        },

    
    subscribeToAlert : function(req,res) {
        if (!req.isSocket)return res.json(401, {err: 'is not a socket request'});
        var id = req.param('id');
        console.log('je passe ici dans le controleur des alert messages');
        AlertMessage.find({AlertMessage: id}).exec(
            function (err, AlertMessages) {
                if (err)return res.error()
                AlertMessage.subscribe(req, _.pluck(AlertMessages, 'id'))
                return res.json(AlertMessages)
            }
        )
    }
};