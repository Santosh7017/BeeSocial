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
    console.log("error in finding user ")
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
            return done(null,insta)
        }
    });
});


