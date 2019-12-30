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
router.route('/board/deletePost')
    .post(apiController.deletePost)
router.route('/board/addPost')
    .post(apiController.addPost)
router.route('/board/update')
    .post(apiController.updatePost)
    
router.route('/user/login')
    .post(apiController.postLogin)
router.route('/user/signUp')
    .post(apiController.signUp)
router.route('/logout')
    .get(apiController.logout)
    
router.route('/home')
    .get(apiController.getSession)
    
exports.routes = router;