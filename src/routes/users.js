const router = require("express").Router();
const { UserController } = require("../controllers");
const { catchAsync } = require("../utils");

router.post("/", catchAsync(UserController.add));

module.exports = router;
