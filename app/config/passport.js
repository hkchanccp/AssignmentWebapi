const JWT = require('jsonwebtoken');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/UserModels');


module.exports = passport => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET
    }, function(token, done) {
        User.findOne({id: token._id}, function(err, user) {
            if (user) {
                return done(null, {
                    id: user.id,
                    username: user.username,
                    email: user.email
                });
            } else {
                return done(null, false);
            }
        });
    }));

    passport.use('login', new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function(username, password, done) {
        User.findOne({username: username}, function(err, user) {
            if (user) {
                user.comparePassword(password, function(DBErr, isMatch) {
                    if (isMatch && !DBErr) {
                        var token = JWT.sign(user.toJSON(), process.env.SECRET, {expiresIn: '1d'});
                        if (token) {
                            done(null, obj); // {success: true, token: `Bearer ${token}`}
                        } else {
                            done(null); // {success: false, msg: 'Signing token failed.'}
                        }
                    } else {
                        if (DBErr) {
                            done(null); // {success: false, msg: 'Authentication failed. (Database Error)', errors: DBErr}
                        } else {
                            done(null); // {success: false, msg: 'Authentication failed. (Credential not match)'}
                        }
                    }
                });
            } else {
                done(null); // {success: false, msg: 'Authentication failed. (User not found)'}
            }
        });
    }));
}