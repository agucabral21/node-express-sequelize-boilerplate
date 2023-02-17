const { okResponse } = require("../utils/responses");
const { logger } = require("../utils");

async function showStatus(req, res) {
  logger.info("Checking the API status: Everything is OK");
  return res.status(200).send(okResponse({}));
}

module.exports = { showStatus };
