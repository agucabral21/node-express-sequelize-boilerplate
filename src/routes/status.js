const router = require('express').Router();
const { StatusController } = require('../controllers');

router.get('/', StatusController.showStatus);

module.exports = router;
