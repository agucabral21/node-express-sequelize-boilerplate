const { sequelize } = require("./database");

const { Role } = sequelize.models;

async function findAll(filters) {
  const roles = await Role.findAll({ where: filters });
  return roles;
}

module.exports = { findAll };
