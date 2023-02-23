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

async function findAll(filters) {
  const user = await User.findAll({ where: filters });
  return user;
}

async function findById(id) {
  const user = await User.findByPk(id);
  return user;
}

async function findByEmail(email) {
  const user = await User.findOne({ where: { email } });
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

async function getRoles(userId) {
  try {
    const user = await findById(userId);
    if (user) {
      const roles = await user.getRoles();
      return roles;
    }
  } catch (err) {
    throw ErrorParser(err);
  }
  return false;
}

module.exports = { create, findById, addRoles, findByEmail, getRoles, findAll };
