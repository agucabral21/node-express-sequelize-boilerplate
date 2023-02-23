const router = require("express").Router();
const { UserController } = require("../controllers");
const { catchAsync } = require("../utils");
const {
  schemaValidator,
  authMiddleware,
  tokenValidation,
} = require("../middlewares");
const { addRole, create } = require("../validation/user");

router.use(tokenValidation);

router.post(
  "/",
  authMiddleware(["admin"]),
  schemaValidator(create),
  catchAsync(UserController.create)
);

router.post(
  "/:id/roles",
  authMiddleware(["admin"]),
  schemaValidator(addRole),
  catchAsync(UserController.addRoles)
);

module.exports = router;
