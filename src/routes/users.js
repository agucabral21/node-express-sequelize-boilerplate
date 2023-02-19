const router = require("express").Router();
const { UserController } = require("../controllers");
const { catchAsync } = require("../utils");
const { schemaValidator } = require("../middlewares");
const { addRole, add } = require("../validation/user");

router.post("/", schemaValidator(add), catchAsync(UserController.add));

router.post(
  "/:id/roles",
  schemaValidator(addRole),
  catchAsync(UserController.addRoles)
);

module.exports = router;
