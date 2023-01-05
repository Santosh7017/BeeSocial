const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');
const postController = require('../controllers/posts_controller');

router.get('/profile',userController.profile);
router.get('/posts',postController.posts);
router.get('/login',userController.login);
router.get('/register',userController.register);
router.post('/create',userController.create);
router.post('/create-session', userController.createSession);
module.exports = router;

