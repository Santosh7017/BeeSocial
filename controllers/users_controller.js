const User = require('../models/user');
const db = require('../config/mongoose');
const fs = require('fs');
const path = require('path');




// module.exports.profile = function (req, res) {
//   User.findById(req.params.id, function(err, user){
//     return res.render('user_profile',
//   {
//     title:"User profile",
//     profile_user: user
//   });    
//   });
  
// }

module.exports.profile = function(req, res){
  User.findById(req.params.id, function(err, user){
    // console.log(user.avatar);
      return res.render('user_profile', {
          title: 'User Profile',
          profile_user: user
      });
      
  });

}


module.exports.update = async function(req, res){
  // if(req.user.id == req.params.id){
  //   User.findByIdAndUpdate(req.params.id,req.body,function(err, user){
  //     return res.redirect('back');
  //   })
  // }else{
  //  return res.status(401).send('Unauthorized');
  // }

  if(req.user.id == req.params.id){

    try{

        let user = await User.findById(req.params.id);
        User.uploadedAvatar(req, res, function(err){
            if (err) {console.log('*****Multer Error: ', err)}
            
            user.name = req.body.name;
            user.email = req.body.email;

            if (req.file){

                if (user.avatar){
                    fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                }


                // this is saving the path of the uploaded file into the avatar field in the user
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            user.save();
            return res.redirect('back');
        });

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }

  }else{
    req.flash('error', "Unauthorized");
    return res.status(401).send('Unauthorized'); 
  }
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
  req.flash('success', 'Logged in succesfully');
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
      req.flash('success', 'You have logged out');

  res.redirect('/');
});

}