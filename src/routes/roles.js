const router = require("express").Router();
const { RoleController } = require("../controllers");
const { catchAsync } = require("../utils");
const {
  schemaValidator,
  authMiddleware,
  tokenValidation,
} = require("../middlewares");

const { create } = require("../validation/role");

router.use(tokenValidation);

router.get("/", authMiddleware(["admin"]), catchAsync(RoleController.findAll));

router.post(
  "/",
  authMiddleware(["admin"]),
  schemaValidator(create),
  catchAsync(RoleController.create)
);

module.exports = router;
