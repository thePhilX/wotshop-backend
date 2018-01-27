// user auth
const passport = require('passport');
const jwt = require('jwt-simple');
const config = require('../config/database');
const User = require('../models/user');

// get Token from Header and return it, if found (else return 0)
var getToken = function(headers) {
    if (headers && headers.authorization) {
        // check header for 'authorization'
        var parted = headers.authorization.split(' ');

        if (parted.length === 2) {
            return parted[1];
        }
        return null;
    }
    return null;
};

var newToken = function(user) {
    return jwt.encode(user, config.secret);
};

// 1. check header for token // 2. check for existing user
var authUser = function(req, res, callback) {
    passport.authenticate('jwt', {
        session: false
    });

    var token = getToken(req.headers);

    if (!token) {
        // 401 when token is missing
        return res.status(401).send({
            success: false,
            msg: 'Authentication failed.'
        });
    }
    // correct user -> token gets decoded
    var decoded = jwt.decode(token, config.secret);

    return User.findOne({
        email: decoded.email
    }, function(err, user) {
        if (err) {
            res.status(500).send({
                success: 'false',
                error: err,
                msg: 'user not found'
            });
        }

        if (!user) {
            return res.status(401).send({
                success: false,
                msg: 'Authentication failed.'
            });
        }
        return callback(user);
    });
};

var Authenticate = {
    authUser: authUser,
    getToken: getToken,
    newToken: newToken
};

module.exports = Authenticate;
