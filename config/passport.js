const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/UserRelation/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username', passwordField: "password" }, (username, password, done) => {
            // Match user
            User.findOne({ username: username }, (err, user) => {
                if (err) throw err;
                if (!user) {
                    return done(null, false, { message: 'No User Found' })
                }

                //Match Password
                bcrypt.compare(password, user.password, function(err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);

                    } else {
                        return done(null, false, {
                            message: 'Wrong password'
                        })
                    }
                });
            })
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}