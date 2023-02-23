const { User, Role } = require("../src/services").database;
const { jwtGenerator } = require("../src/utils");

async function truncateDB() {
  await User.destroy({
    truncate: { cascade: true, restartIdentity: true },
  });
  await Role.destroy({
    truncate: { cascade: true, restartIdentity: true },
  });
}

async function getToken(id, roles = []) {
  const userPayload = { user: { id, roles } };
  const token = await jwtGenerator.generateToken(userPayload);
  return token;
}

module.exports = { truncateDB, getToken };
