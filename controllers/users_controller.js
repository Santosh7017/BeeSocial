const User = require('../models/user');
const db = require('../config/mongoose');
// const { response } = require('express');


module.exports.profile = function(req, res){
  // return res.render('user_profile');

  if(req.cookies.user_id){
    User.findById(req.cookies.user_id,function(err,user){
      if(user){
          return res.render('user_profile',{
            title:'user profile',
            user:user
          });
      }
      return res.redirect('/users/login');
    });
  }else{
    return res.redirect('/users/login');
  }
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

  // console.log(req.body.email);
  // console.log(req.body.password);
  //* steps to autheticate
  // find the user 
  User.findOne({
    email:req.body.email
  },function(err,user){
    if(err){
      console.log('Error in creating user in signing in');
      return;
    }



  //handle user found

  if(user){

     // handle password which don't match
    if(user.password != req.body.password){
      console.log(req.body.password);
      return res.redirect('back');
    }

  // handle session creation
res.cookie('user_id',user.id);
return res.redirect('/users/profile');

  // handle user not found
  }else{
    console.log(req.body.password);
   
    return res.redirect('back');
  }

});

  
}