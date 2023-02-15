const router = require('express').Router();

router.use('/status', require('./status'));

module.exports = router;
