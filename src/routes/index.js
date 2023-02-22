const router = require("express").Router();

router.use("/status", require("./status"));
router.use("/users", require("./users"));
router.use("/roles", require("./roles"));

module.exports = router;
