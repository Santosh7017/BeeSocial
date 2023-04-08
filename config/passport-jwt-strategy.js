const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

// key 

// let opts = {
//     // header iss a list of keys,  header has a key called authorization that is also a list of keys so that can have a key called bearer that has a JWT tocken, we will be ale to extract authorization 
//     JWTFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
//     // this secret is use to encrypt and decrypt the key
//     secretOrKey: 'beesocial'
// }

// updated passport sectino for v3 or above
var opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.BEESOCIAL_JWT_SECRET;
// call back function read data from the payload which contains the information
passport.use(new JWTStrategy(opts, function(JWTPayLoad, done){
    User.findById(JWTPayLoad._id, function(err, user){
        if(err){console.log('error in finding user from JWt'); return;}
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}));
module.exports = passport;      