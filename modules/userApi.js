const Authenticate = require('./authenticate');
const User = require('../models/user');

var API = {};

API.authenticate = function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) {
            return res.status(500).send({
                success: 'false',
                error: err,
                msg: 'Internal Server Problem'
            });
        }

        if (!user) {
            return res.status(404).send({
                success: false,
                msg: 'Authentication failed. User not found.'
            });
        }
        // correct password ?
        return user.comparePassword(req.body.password, function(err, isMatch) {
            if (isMatch && !err) {
                // token if user & password
                var token = Authenticate.newToken(user);

                // return Token in JSON response
                return res.json({
                    success: true,
                    token: 'JWT ' + token
                });
            }
            return res.status(404).send({
                success: false,
                msg: 'Authentication failed. Wrong password.'
            });

        });
    });
};

// get an array of all users
API.getAllUsers = function(req, res) {
    User.find(function(err, users) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(users);
    }).select('-password');
};

// look for user with the help of the ID
API.getUser = function(req, res) {
    if (req.params.id === 'me') {
        Authenticate.authUser(req, res, function(user) {
            if (user) {
                var modifiedUser = user;
                delete modifiedUser.password;
                // console.log(user);
                return res.status(200).send(modifiedUser);
            }
            return res.status(500).send('Failed to find User.');
        });
    } else {
        User.findOne({
            _id: req.params.id
        }, function(err, user) {
            if (err) {
                return res.status(400).send(err);
            }
            return res.status(200).send(user);
        }).select('-password');
    }
};

// post new user

API.postUser = function(req, res) {
    console.log("post started");
    var newUser = new User({
        email: req.body.email,
        password: req.body.password,
        accounts: req.body.accounts,
        timestamp: req.body.timestamp
        // TODO accounts including server, wotPassword & wotEmail
    });
    console.log("UserObject:" + newUser);
    newUser.save(function(err, saveRes) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send('Success!');
    });
};

// update User (id = url param)
API.updateUser = function(req, res) {
    User.findOne({
        _id: req.params.id
    }, function(findErr, user) {
        if (findErr) {
            return res.status(400).send(findErr);
        }
        var updatedUser = user;
        if (req.body.password) updatedUser.password = req.body.password;
        if (req.body.accounts) updatedUser.accounts = req.body.accounts;
        
        return updatedUser.save(function(saveErr, saveRes) {
            if (saveErr) {
                return res.status(500).send(saveErr);
            }
            return res.status(200).send('Success!');
        });
    });
};

API.removeUser = function(req, res) {
    User.remove({
        _id: req.params.id
    }, function(err, removeRes) {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(200).send('Success!');
    });
};

module.exports = API;
