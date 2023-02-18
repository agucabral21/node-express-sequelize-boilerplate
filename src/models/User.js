const { hash } = require("bcrypt");

const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  User.addHook("beforeSave", "encryptPassword", async (user) => {
    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword; // eslint-disable-line no-param-reassign
  });

  return User;
};

module.exports = UserModel;
