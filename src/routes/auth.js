const router = require("express").Router();
const { catchAsync } = require("../utils");
const { schemaValidator } = require("../middlewares");
const { login } = require("../validation/auth");
const { AuthController } = require("../controllers");

router.post("/", schemaValidator(login), catchAsync(AuthController.login));

module.exports = router;
