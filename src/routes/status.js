const router = require('express').Router();
const { StatusController } = require('../controllers');
const { catchAsync } = require('../utils');

router.get('/', catchAsync(StatusController.showStatus));

module.exports = router;
