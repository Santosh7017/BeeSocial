const User = require('../models/user');
const db = require('../config/mongoose')


module.exports.profile = function(req, res){
  return res.render('user_profile');
};



// render login page
module.exports.login = function(req,res){
    return res.render('login');
};

// render signup or register page
module.exports.register = function(req,res){
  return res.render('register');
};


// get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
      return res.redirect('back');
    }
    // console.log(req.body.email);
    User.findOne({email:req.body.email}, function(err, user){
      if(err){
        console.log('Error in finding user in signing up',err);
        return;
      }
      if(!user){
        User.create(req.body, function(err, user){
          if(err){
            console.log('Error in creating user in signing up');
            return;
          }
          return res.redirect('/users/login')
        }); 

      }else{
        return res.redirect('back');
      }
    });

}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
  console.log("inside create session");
  // return res.redirect('/users/profile');
  // res.render('user_profile');
  return res.redirect('/');
}