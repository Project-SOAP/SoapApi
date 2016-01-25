/**
 * Created by Hubert on 23/01/2016.
 */
module.exports = {
    connection: [ 'rabbitCluster', 'mongoLocal' ],
    routingKey: [ 'stream', 'parentMessage' ],
    attributes: {
        title: 'yo dawg',
        body: 'I heard you like messages',
        stream: 'random',
        parentMessage: 1234
    }
};