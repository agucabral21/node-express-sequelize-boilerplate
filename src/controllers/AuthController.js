const { generateToken } = require("../utils/jwtGenerator");
const { UserService } = require("../services");
const { errorResponse, okResponse } = require("../utils/responses");

async function login(req, res) {
  const { email, password } = req.body;

  const user = await UserService.findByEmail(email);
  if (!user) {
    return res
      .status(401)
      .send(errorResponse({ message: "User does not exist." }));
  }
  const validPass = await user.validPassword(password);
  if (!validPass) {
    return res
      .status(401)
      .send(errorResponse({ message: "Incorrect Password." }));
  }
  const userRoles = await UserService.getRoles(user.id);
  const roles = userRoles.map((role) => role.name);

  const payload = { user: { id: user.id, roles } };
  const token = await generateToken(payload);

  return res.status(200).send(okResponse({ data: { token } }));
}

module.exports = { login };
