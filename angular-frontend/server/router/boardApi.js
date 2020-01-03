const express = require('express');

const boardApiController = require('../controller/boardApi');

const router = express.Router();

//   /api/board

router.route('/:boardId')
    .get(boardApiController.postsList)
router.route('/:boardId/:postId')
    .get(boardApiController.getPost)
router.route('/deletePost')
    .post(boardApiController.deletePost)
router.route('/addPost')
    .post(boardApiController.addPost)
router.route('/update')
    .post(boardApiController.updatePost)
router.route('/deleteComment')
    .post(boardApiController.deleteComment)
router.route('/addComment')
    .post(boardApiController.addComment)
    
exports.routes = router;