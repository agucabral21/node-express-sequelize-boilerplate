const router = require("express").Router();
const { RoleController } = require("../controllers");
const { catchAsync } = require("../utils");
const { schemaValidator, authMiddleware } = require("../middlewares");

const { create } = require("../validation/role");

router.get("/", authMiddleware(["admin"]), catchAsync(RoleController.findAll));

router.post(
  "/",
  authMiddleware(["admin"]),
  schemaValidator(create),
  catchAsync(RoleController.create)
);

module.exports = router;
