var User = require('../app/models/user');
var Session = require('../app/models/session')
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
jwtOptions.secretOrKey = process.env.secret;
jwtOptions.passReqToCallback = true;

//expose this function to our app using module.exports
module.exports = function (passport) {
    var jwt = new JwtStrategy(jwtOptions, function (req, payload, next) {

        let tokenReq = req.headers.authorization.replace('Bearer ', '')
        Session.findOne({ token: tokenReq }, function (err, session) {
            if (err) {
                console.log(err)
                return next(err, false);
            }
            if(session){
                if( session.active===true){
                    User.findById(payload.id, function (err, user) {
                        if (err) {
                            console.log(err)
                            return next(err, false);
                        }
            
                        if (user) {
                            req.user = user; 
                            //console.log(user)
                            next(null, user);
            
                        } else {
                            //console.log("failed")
                            next(err, false);
            
                        }
                    });
                }else{
                    next(err, false);
                }
            }else{
                return next(err, false);
            }
           
        });

      
    });
    passport.use(jwt);

};








