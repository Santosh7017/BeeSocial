const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const user = require('../models/user');
const User = require('../models/user');

// tell passport to use new strategy for google login 
passport.use(new googleStrategy({
    clientID: "228605161665-mrmnseik6dj29t0atc9i3mtjskgshnv9.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/users/auth/google/callback"
    },
    function(accessToken,refreshToken, profile, done){
        // find the use
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log("error in google-strategy-passport",err);
                return;
            }
            console.log(profile);

            if(user){
                // if found, set the use as req.user
                return done(null, user);
            }else{
                // if not found, create the use and set it as req.user
             User.create({
                name:profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes[20].toString('hex')
             },
             function(err, user){
                if(err){
                    console.log("error in creating user google-strategy-passport",err);
                    return;
                }
                return done(null, user);
             }
             )   
            }
        })
    }

));
module.exports = passport;