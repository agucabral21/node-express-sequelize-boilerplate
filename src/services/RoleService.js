const { sequelize } = require("./database");
const ErrorParser = require("../errors/ErrorParser");

const { Role } = sequelize.models;

async function findAll(filters = {}) {
  const roles = await Role.findAll({ where: filters });
  return roles;
}

async function create(data) {
  try {
    const roles = await Role.create(data);
    return roles;
  } catch (err) {
    throw ErrorParser(err);
  }
}

async function deleteRole(id) {
  const roles = await Role.delete(id);
  return roles;
}

module.exports = { findAll, create, deleteRole };
