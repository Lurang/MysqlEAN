const express = require('express');

const userApiController = require('../controller/userApi');

const router = express.Router();

//   /api/user

router.route('/login')
    .post(userApiController.postLogin)
router.route('/signUp')
    .post(userApiController.signUp)
router.route('/logout')
    .get(userApiController.logout)

exports.routes = router;