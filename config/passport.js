var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');
var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'secretKey';

//expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    // passport.use(
    //     new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    //         console.log('payload received', jwt_payload);
    //         // usually this would be a database call:

    //         db.query('select * from user where user_id=?', [jwt_payload.id], function (err, result, fields) {
    //             if (err) throw err;
    //             if (result.length > 0)
    //                 next(null, result[0]);
    //             else
    //                 next(null, false);

    //             // console.log(result);
    //         })
    //     })
    // );

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) { // callback with email and password from our form



            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'mail': email }, function (err, user) {
                // if there are any errors, return the error before anything else

                if (err)
                    return done(null, false, req.flash('error', err)); // req.flash is the way to set flashdata using connect-flash


                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('error', 'Sorry Your Account Not Exits ,Please Create Account.')); // req.flash is the way to set flashdata using connect-flash



                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, req.flash('error', 'Email and Password Does Not Match.')); // create the loginMessage and save it to session as flashdata

                if (user.status === 'inactive')
                    return done(null, false, req.flash('error', 'Your Account Not Activated ,Please Check Your Email')); // create the loginMessage and save it to session as flashdata


                // all is well, return successful user
                req.session.user = user;

                return done(null, user);
            });

        }));

};








