const { User, Role } = require("../src/services").database;

async function truncateDB() {
  await User.destroy({
    truncate: { cascade: true, restartIdentity: true },
  });
  await Role.destroy({
    truncate: { cascade: true, restartIdentity: true },
  });
}

module.exports = { truncateDB };
