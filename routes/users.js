const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');
const postController = require('../controllers/posts_controller');

router.get('/profile',passport.checkAuthentication,userController.profile);  // this will redirect to authentication page 
// router.get('/posts',postController.posts);
router.get('/login',userController.login);
router.get('/register',userController.register);
router.post('/create',userController.create);

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

module.exports = router;

