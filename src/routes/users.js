const router = require("express").Router();
const { UserController } = require("../controllers");
const { catchAsync } = require("../utils");
const { schemaValidator, authMiddleware } = require("../middlewares");
const { addRole, create } = require("../validation/user");

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

router.get("/", authMiddleware(["admin"]), catchAsync(UserController.findAll));

module.exports = router;
