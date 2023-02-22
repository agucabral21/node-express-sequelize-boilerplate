const router = require("express").Router();
const { RoleController } = require("../controllers");
const { catchAsync } = require("../utils");
const { schemaValidator } = require("../middlewares");
const { create } = require("../validation/role");

router.post("/", schemaValidator(create), catchAsync(RoleController.create));

module.exports = router;
