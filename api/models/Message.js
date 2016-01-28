/**
 * Created by Hubert on 23/01/2016.
 */
module.exports = {
    
    attributes: {
       title: 'string',
        body: 'string',
        stream: {
            model: 'stream'
        },
        parentMessage: {
            model: 'message'
        }
    }
};