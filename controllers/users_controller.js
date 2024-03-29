const User = require('../models/user');
const db = require('../config/mongoose');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const ResetPassToken = require('../models/reset_pass');
const queue = require('../config/kue');
const resetPasswordWorker = require('../workers/reset_password_worker');



module.exports.profile = async  function(req ,res){

    
  try {
      let myUser =  await  User.findById(req.params.id);
    let usersFriendships;
      if(req.user){
          usersFriendships = await User.findById(req.user._id).populate({ 
             path : 'friendships',
             options :  { sort: { createdAt: -1 } },
             populate : {
                 path: 'from_user to_user'
             }}).exec();
         }
          let isFriend = false;
          for( const Friendships of usersFriendships.friendships ){

              if(Friendships.from_user.id == myUser.id || Friendships.to_user.id == myUser.id ){
                  isFriend = true ;
                  break;
              }
          }

         return res.render('user_profile' , {
          title : "PROFILE",
          heading : "PROFILE PAGE",
          profile_user: myUser,
          myUser : usersFriendships ,
          isFriend : isFriend
       });

  } catch (err) {
      console.log(err);
      return;
  }

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
module.exports.forgotpassword = function (req, res) {
  return res.render('forgotpassword',{
    title: 'Forgot Password'
  });
};
module.exports.verifyToken = async function (req, res) {
  // get email from form
  const email = req.body.email;
  // check if email exists
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        req.flash('error', 'Email does not exist');
        return res.redirect('back');
      }
      // generate token
      const accessToken = crypto.randomBytes(20).toString('hex');
      // set token to user
        const token = await ResetPassToken.create({ 
          user:user._id,
          accessToken: accessToken,
          isValid: true
        });
        // send email
        const myToken = await token.populate('user','name email');
        let job =  queue.create('resetPassword', myToken).save(function(err){
          if(err){
            console.log('Error in sending to the queue', err);
            return;
          }
          // console.log('job enqueued', job.id);
            
        });
        req.flash('success', 'Email has been sent, kindly check your inbox');
        return res.redirect('back');


    } catch (error) {
      req.flash('error', 'Error in sending email');
      console.log('Error in sending email', error);
      return res.redirect('back');
    }
}

module.exports.resetPassword = async function (req, res){
  // get token from url using params
    const token = req.query.token;
    // console.log('This is accessToken',token);
    // check if token exists

    try{
      // if token exists
        if(token){
          // find token
            const tokenFound = await ResetPassToken.findOne({'accessToken': token});
            // if token found and check for validation
            if(tokenFound && tokenFound.isValid){
              // redirect to reset password page with the titke reset password
                return res.render('resetPassword.ejs',{
                    title: 'Reset Password',
                    accessToken: token
                });
                // otherwise redirect to forgot password page
            }else{
              req.flash('error', "Token not found");
              return res.redirect('forgotpassword');
            }
        }
    }catch(err){
      console.log('Error in finding token', err);
      return;
    }
 
}

  module.exports.updatePass = async function(req, res){
    const password = req.body.newPass;
    const confirm_password = req.body.confPass;
      if(password != confirm_password){
        req.flash('error', "Password does not match");
        return res.redirect('back');
      }
      // get token from body
      try {
        const token = req.body.accessToken;
        let accessToken = await ResetPassToken.findOne({accessToken: token});
        if(accessToken && accessToken.isValid){
          let user = await User.findById(accessToken.user);
          user.password = password;
          await user.save();
          accessToken.remove();

          req.flash('success', "Password updated successfully");
          return res.redirect('/users/login');

        }else{
          req.flash('error', "Token not found");
          return res.redirect('back');
        }

      } catch (error) {
          req.flash('error', "Error in updating password");
          console.log('Error in updating password', error);
          return res.redirect('back');
      } 
  }