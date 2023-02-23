const router = require("express").Router();
const { tokenValidation } = require("../middlewares");

router.use("/status", require("./status"));
router.use("/users", tokenValidation, require("./users"));
router.use("/roles", tokenValidation, require("./roles"));
router.use("/auth", require("./auth"));

module.exports = router;
