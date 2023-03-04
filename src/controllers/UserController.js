const { okResponse, errorResponse } = require("../utils").responses;
const { UserService, RoleService } = require("../services");

async function findAll(req, res) {
  const users = await UserService.findAll();
  return res.status(200).send(okResponse({ data: users }));
}

async function findById(req, res) {
  const { id } = req.params;
  const user = await UserService.findById(id);

  if (!user)
    return res.status(404).send(okResponse({ message: "User not found." }));

  const data = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  return res.status(200).send(okResponse({ data }));
}

async function create(req, res) {
  const { firstName, lastName, email, password } = req.body;
  const userData = { firstName, lastName, email, password };
  const user = await UserService.create(userData);
  const data = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  return res.status(200).send(okResponse({ data }));
}

async function addRoles(req, res) {
  const { id } = req.params;
  const rolesIds = req.body.roles;

  const user = await UserService.findById(id);

  if (!user)
    return res.status(404).send(errorResponse({ message: "User not Found." }));

  const filters = { id: rolesIds };

  const roles = await RoleService.findAll(filters);
  if (roles.length !== rolesIds.length)
    return res
      .status(400)
      .send(errorResponse({ message: "Some roles are invalid, please check" }));

  const result = await UserService.addRoles(user.id, rolesIds);

  if (result) return res.status(200).send(okResponse({}));

  return res.status(500).send(
    errorResponse({
      message: "An unexpected error ocurred and roles where not assigned.",
    })
  );
}

module.exports = { findAll, create, addRoles, findById };
