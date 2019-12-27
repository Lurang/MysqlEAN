const express = require('express');

const apiController = require('../controller/api')

const router = express.Router();

// /api/~

router.route('/')
    .get(apiController.getIndex)
router.route('/board/:boardId')
    .get(apiController.postsList)
router.route('/board/:boardId/:postId')
    .get(apiController.getPost)
router.route('/user/login')
    .post(apiController.postLogin)
router.route('/home')
    .get(apiController.getSession)
router.route('/logout')
    .get(apiController.logout)
    
exports.routes = router;