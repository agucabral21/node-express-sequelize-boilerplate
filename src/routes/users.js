const router = require("express").Router();
const { UserController } = require("../controllers");
const { catchAsync } = require("../utils");
const { schemaValidator, authMiddleware } = require("../middlewares");
const { addRole, create, findById } = require("../validation/user");

router.get("/", authMiddleware(["admin"]), catchAsync(UserController.findAll));

router.get(
  "/:id",
  authMiddleware(["admin"]),
  schemaValidator(findById),
  catchAsync(UserController.findById)
);

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
