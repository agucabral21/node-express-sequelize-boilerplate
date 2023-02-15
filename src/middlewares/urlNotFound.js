const { errorResponse } = require('../utils/responses');

const urlNotFound = (req, res) => {
  res.status(404).json(errorResponse({ message: `Can't find ${req.originalUrl} on this server!` }));
};

module.exports = urlNotFound;
