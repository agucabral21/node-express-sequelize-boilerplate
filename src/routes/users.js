const router = require("express").Router();
const { UserController } = require("../controllers");
const { catchAsync } = require("../utils");
const { schemaValidator } = require("../middlewares");
const { addRole, create } = require("../validation/user");

router.post("/", schemaValidator(create), catchAsync(UserController.create));

router.post(
  "/:id/roles",
  schemaValidator(addRole),
  catchAsync(UserController.addRoles)
);

module.exports = router;
