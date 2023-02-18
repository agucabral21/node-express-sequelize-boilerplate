const router = require("express").Router();

router.use("/status", require("./status"));
router.use("/users", require("./users"));

module.exports = router;
