/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/SoapDB';


module.exports = {
    // a CREATE action
    create: function(req, res, next) {
        var params = req.params.all();
        User.create(params, function(err, user) {

            if (err) return next(err);

            res.status(201);
            return res.json({user : user});
        });
    },

    // a FIND action
    find: function(req, res) {
        var id = req.param('id');
        var idShortCut = isShortcut(id);

        if (idShortCut === true) {
            return next();
        }

        if (id) {
            console.log(id);
            User.findOne(id, function(err, user) {


                if (user === undefined) return res.notFound();

                if (err) return res.json(err);
                sails.log(user)
                return res.jsonx(user);
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

            User.find(options, function(err, user) {

                if (user === undefined) return res.notFound();
                if (err) return next(err);

                return res.json(user);
            });
        }

        function isShortcut(id) {
            if (id === 'find' || id === 'update' || id === 'create' || id === 'destroy') {
                return true;
            }
        }
    },

    // an UPDATE action
    update: function(req, res, next) {
        var criteria = {};
        criteria = _.merge({}, req.params.all(), req.body);

        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        User.update(id, criteria, function(err, user) {

            if (!user) return res.notFound();
            if (err) return next(err);

            return res.json(user);
        });
    },

    // a DESTROY action
    destroy: function(req, res, next) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }
        User.destroy(id).exec(function(err, result) {
            if (err) return res.serverError(err);

            if (!result) return res.notFound();
            return res.ok(result);
        });
    },

    findDrivers : function(db, callback, num) {
        var cursor =db.collection('User').find( { "driver.society" : num }  );
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                console.dir(doc);
            } else {
                callback();
            }
        });
    },

    findTechies : function(db, callback, num) {
        var cursor =db.collection('User').find( { "techies.society" : num }  );
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                console.dir(doc);
            } else {
                callback();
            }
        });
    }
};

