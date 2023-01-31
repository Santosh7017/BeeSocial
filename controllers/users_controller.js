const User = require('../models/user');
const db = require('../config/mongoose');




module.exports.profile = function (req, res) {
  User.findById(req.params.id, function(err, user){
    return res.render('user_profile',
  {
    title:"User's profile",
    profile_user: user
  });    
  });
  
}


// render signup or register page
module.exports.register = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('register',{
    title: 'Register'
  });
};
// render login page
module.exports.login = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('login',{
    title: 'Login'
  });
};


// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }
  // console.log(req.body.email);
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log('Error in finding user in signing up', err);
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log('Error in creating user in signing up');
          return;
        }
        return res.redirect('/users/login')
      });

    } else {
      return res.redirect('back');
    }
  });

}

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  // console.log("inside create session");
  // return res.redirect('/users/profile');
  // res.render('user_profile');
  return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    // req.logout();

    // return res.redirect('/');
    req.logout(function(err) {
      if (err) { return next(err); }
  res.redirect('/');
});
}