const { sequelize } = require("./database");

const { User } = sequelize.models;

class UserService {
  static async add(data) {
    const user = await User.create(data);
    return user;
  }
}

module.exports = UserService;
