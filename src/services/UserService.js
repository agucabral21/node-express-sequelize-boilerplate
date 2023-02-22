const { sequelize } = require("./database");
const ErrorParser = require("../errors/ErrorParser");

const { User } = sequelize.models;

async function create(data) {
  try {
    const user = await User.create(data);
    return user;
  } catch (err) {
    throw ErrorParser(err);
  }
}

async function findById(id) {
  const user = await User.findByPk(id);
  return user;
}

async function addRoles(userId, rolesIds) {
  try {
    const user = await findById(userId);
    if (user) {
      await user.addRoles(rolesIds);
      return true;
    }
  } catch (err) {
    throw ErrorParser(err);
  }
  return false;
}

module.exports = { create, findById, addRoles };
