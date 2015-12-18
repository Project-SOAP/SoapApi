/**
 * Created by Hubert on 18/12/2015.
 */
module.exports = function authenticated(req, res, next) {

    var token = req.headers.authorization || false;
    if (req.isSocket) {
        token = req.body.token;
        delete req.body.token;
    }

    if (!token) {
        return res.json(401, {err: "user should be authenticated"})
    }
    User.findOne({token: token}, function (err, user) {
        if (err || !user) return res.json(401, {err: "user should be authenticated"})
        req.user = user;
        req.token = token;
        next();
    })
}