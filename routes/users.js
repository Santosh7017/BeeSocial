const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');
const postController = require('../controllers/posts_controller');

router.get('/profile/:id',passport.checkAuthentication,userController.profile);  // this will redirect to authentication page 
router.post('/update/:id',passport.checkAuthentication,userController.update);

// router.get('/posts',postController.posts);
router.get('/login',userController.login);
router.get('/register',userController.register);
router.post('/create',userController.create);
router.get('/forgotpassword',userController.forgotpassword);
router.post('/verifytoken',userController.verifyToken);
router.get('/resetpassword',userController.resetPassword);
router.post('/updatePass', userController.updatePass)

// use passport as a middleware to authenticate
router.post('/login',passport.authenticate(
    'local',
    {failureRedirect:'/users/login',
    // successRedirect: '/'
}),
// ,function(req,res)
// {
// //   todo s- fix the problem of redirecting
//     console.log("login succesfull");
//     res.end('<h1>Logged in succesfully please go to home page <a href="/">Home</a></h1>');
// }
userController.createSession
);

router.get('/logout',userController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/login'}),userController.createSession);

module.exports = router;

