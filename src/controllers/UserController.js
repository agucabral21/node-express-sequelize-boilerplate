const { okResponse, errorResponse } = require("../utils").responses;
const { UserService, RoleService } = require("../services");

async function add(req, res) {
  const { firstName, lastName, email, password } = req.body;
  const userData = { firstName, lastName, email, password };
  const user = await UserService.add(userData);
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

  await user.addRoles(roles);

  return res.status(200).send(okResponse({}));
}

module.exports = { add, addRoles };
