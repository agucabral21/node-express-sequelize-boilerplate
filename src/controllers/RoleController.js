const { okResponse } = require("../utils").responses;
const { RoleService } = require("../services");

async function create(req, res) {
  const { name } = req.body;
  const role = await RoleService.create({ name });
  return res.status(200).send(okResponse({ data: role }));
}

module.exports = { create };
