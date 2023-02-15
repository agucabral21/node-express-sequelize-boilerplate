const { okResponse } = require('../utils/responses');

function showStatus(req, res) {
  return res.status(200).send(okResponse({}));
}

module.exports = { showStatus };
