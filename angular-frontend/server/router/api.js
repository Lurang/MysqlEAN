const express = require('express');

const apiController = require('../controller/api');

const router = express.Router();

// /api/~

router.route('/')
    .get(apiController.getIndex)
router.route('/home')
    .get(apiController.getSession)
    
exports.routes = router;