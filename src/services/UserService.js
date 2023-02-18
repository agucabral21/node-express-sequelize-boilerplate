const { sequelize } = require("./database");

const { User } = sequelize.models;

async function add(data) {
  const user = await User.create(data);
  return user;
}

async function findById(id) {
  const user = await User.findByPk(id);
  return user;
}

module.exports = { add, findById };
