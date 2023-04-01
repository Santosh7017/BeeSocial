const express = require('express');

const router = express.Router();
const likesController = require('../controllers/likes_controller');
router.use('/toggle', likesController.toggleLike);

module.exports = router;


