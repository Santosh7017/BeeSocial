const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;


// authentication using passport
passport.use(new LocalStrategy({
    // username in schema
usernameField:'email'
},
function(email, password, done){
    // find a user and establish the identity
    User.findOne({email:email}, function(err, user){
if(err){
    console.log("error in finding user ");
    return done(err);
}
    if(!user || user.password != password){
        console.log("Invalid username/password");
        return done(null,false);
    }



    return done(null,user);
    });
}
));


//  serializing and serialization
//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});


// deserializing the user the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(function(err,user){
        if(err){
            console.log("Error in finding user");
            return done(null,user);
        }
       return done(err,user);
    });
});

// check if the user is authenticated
// passport.checkAuthentication = function(req, res, next){
//     //  if the user is siged in then pass on the request to the next function(controller's action)
//         if(req.isAuthenticated()){
//         return next();
//     }

//     return res.redirect('/users/login');
// }
// passport.setAuthenticatedUser = function(req, res,next){
//     if(req.isAuthenticated){
//         // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
//         res.locals.user = req.user;
//     }
// }

module.exports = passport;


