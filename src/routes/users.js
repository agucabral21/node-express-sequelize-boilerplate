const router = require("express").Router();
const { UserController } = require("../controllers");
const { catchAsync } = require("../utils");
const { schemaValidator } = require("../middlewares");
const { add } = require("../validation/user");

router.post("/", catchAsync(UserController.add));
router.post(
  "/:id/roles",
  schemaValidator(add),
  catchAsync(UserController.addRoles)
);

module.exports = router;
