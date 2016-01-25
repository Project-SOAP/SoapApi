/**
 * Technician.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcryptjs')
module.exports = {

    connection: [ 'rabbitCluster', 'mongoLocal' ],
    routingKey: [ 'stream', 'parentMessage' ],
    attributes: {

        name: {
            type: 'string',
            required: true,
            unique : true,
            minLength: 3
        },

        email: {
            //type: 'email',
            required: true,
            unique: true
        },

        password: {
            type: 'string',
            required: true
        },

        token: {
            type: 'text'
        },

        refreshToken: {
            type: 'text'
        },
        skill: {
            collection: 'Breakdown',
            via: 'techies',
            dominant : 'true'
        },
        society:{
            type:'string'
        },
        position: {
            model: 'Position'
        },

        available: {
            type : 'boolean',
            defaultsTo: 'false'
        },

        toJSON: function () { // Fonction permettant d�enlever des �l�ments en clair
            var obj = this.toObject();
            //delete obj.password;
            delete obj.refreshToken;
            delete obj.createAt;
            delete obj.updateAt;
            return obj
        }
    },


    beforeCreate: function (value, next) {
        console.log('je passe dans le beforeCreate')

        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(value.password, salt, function (err, hash) {
                if (err) return next(err);
                value.password = hash;
                value.refreshToken = JwtHandler.generate({email: value.email});
                next();
            })
        })
    },
    comparePassword: function (password, technician, cb) {
        bcrypt.compare(password, technician.password, function (err, match) {
            if (err)cb(err)
            if (match) {
                cb(null, true)
            } else {
                cb(err)
            }
        })
    },

    /*beforeUpdate: function (value, next) {
        if (value.password.length >= 20){
            next()
        } else {
            console.log('je passe dans le beforeUpdate')
            bcrypt.genSalt(10, function (err, salt) {
                if (err) return next(err);
                bcrypt.hash(value.password, salt, function (err, hash) {
                    if (err) return next(err);
                    value.password = hash;
                    value.refreshToken = JwtHandler.generate({email: value.email});
                    next();
                })
            })
        }
    }*/
};

