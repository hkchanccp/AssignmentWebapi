const User = require('../../models/UserModels');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../../config/passport');


/* Register */
exports.register = (req, res) => {
    var { email, username, password, confirm } = req.body;

    let errors = [];

    if (!email) {
        errors.push({success: false, msg: 'Email required'});
    }
    if (!username) {
        errors.push({success: false, msg: 'Username required'});
    }
    if (!password) {
        errors.push({success: false, msg: 'Password required'});
    }
    if (password != confirm) {
        errors.push({success: false, msg: 'Password does not match'});
    }

    if (!errors.length) {
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({success: false, msg: 'Email is already registered'});
                    return res.status(400).json(errors);
                } else {
                    const newUser = new User({
                        email,
                        username,
                        password
                    });

                    newUser.save()
                        .then(() => {
                            passport.authenticate('local', { session: false })(req, res, () => {
                                res.status(200).json({success: true, msg: 'success'})
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            return res.status(400).json(err);
                        });
                }
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json('Unable to create user');
            });
    } else {
        console.log(errors);
        return res.status(400).json(errors);
    }
}


/* Login */
exports.login = (req, res) => {
    var { username, password } = req.body;
    User.findOne({ username: username })
        .then(user => {
            if (user) {
                user.comparePassword(password, function(DBErr, isMatch) {
                    if (isMatch && !DBErr) {
                        var authUser = {
                            id: user._id,
                            username: user.username
                        }
                        jwt.sign(authUser, process.env.SECRET, {expiresIn: '1h'}, (err, token) => {
                            if (token) {
                                return res.status(200).json({success: true, msg: 'Login Success', token: token});
                            } else {
                                return res.status(500).json({success: false, msg: 'Signing token failed.', errors: err});
                            }
                        });
                    } else {
                        if (DBErr) {
                            return res.status(401).json({success: false, msg: 'Authentication failed. (Database Error)', errors: DBErr});
                        } else {
                            return res.status(401).json({success: false, msg: 'Authentication failed. (Credential not match)'});
                        }
                    }
                });
            } else {
                return res.status(401).json({success: false, msg: 'Authentication failed. (User not found)'});
            }
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({success: false, msg: 'Unexpected Error.', errors: err});
        });
}