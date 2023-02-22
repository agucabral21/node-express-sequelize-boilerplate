const { errorResponse } = require("../utils/responses");
const { logger } = require("../utils");

// Any error will be handled by this middleware
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { message, statusCode } = err;
  logger.error(err);
  return res.status(statusCode).send(errorResponse({ message }));
};

module.exports = errorHandler;
