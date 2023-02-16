const { errorResponse } = require('../utils/responses');
const { logger } = require('../utils');

// Any error will be handled by this middleware
const errorHandler = (err, req, res, next) => {
  const { message } = err;

  logger.error(err);

  return res.status(500).send(errorResponse({ message }));
};

module.exports = errorHandler;
