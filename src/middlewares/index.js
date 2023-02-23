const urlNotFound = require("./urlNotFound");
const morgan = require("./morgan");
const errorHandler = require("./errorHandler");
const schemaValidator = require("./schemaValidator");
const authMiddleware = require("./auth");

module.exports = {
  urlNotFound,
  morgan,
  errorHandler,
  schemaValidator,
  authMiddleware,
};
