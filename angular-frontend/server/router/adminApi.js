const express = require('express');

const adminApiController = require('../controller/adminApi');

const router = express.Router();

//   /api/admin

router.route('/:boardId')
    .get(adminApiController.getBoard)
router.route('/updateBoard')
    .post(adminApiController.updateBoard)
router.route('/newBoard')
    .post(adminApiController.newBoard)
router.route('/deleteBoard')
    .post(adminApiController.deleteBoard)

exports.routes = router;