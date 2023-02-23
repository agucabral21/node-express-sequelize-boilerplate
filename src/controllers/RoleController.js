const { okResponse } = require("../utils").responses;
const { RoleService } = require("../services");

async function create(req, res) {
  const { name } = req.body;
  const role = await RoleService.create({ name });
  return res.status(200).send(okResponse({ data: role }));
}

async function findAll(req, res) {
  const roles = await RoleService.findAll();
  return res.status(200).send(okResponse({ data: roles }));
}

module.exports = { create, findAll };
