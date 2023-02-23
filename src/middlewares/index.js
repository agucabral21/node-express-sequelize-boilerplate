const urlNotFound = require("./urlNotFound");
const morgan = require("./morgan");
const errorHandler = require("./errorHandler");
const schemaValidator = require("./schemaValidator");
const authMiddleware = require("./auth");
const tokenValidation = require("./tokenValidation");

module.exports = {
  urlNotFound,
  morgan,
  errorHandler,
  schemaValidator,
  authMiddleware,
  tokenValidation,
};
