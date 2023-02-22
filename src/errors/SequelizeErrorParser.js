const sequelizeErrorParser = (error) => {
  const parsedError = { type: "sequelize" };

  if (error.name === "SequelizeValidationError") {
    parsedError.statusCode = 400;
    parsedError.message = `${error.errors.map((e) => e.message).join(", ")}`;
  } else if (error.name === "SequelizeUniqueConstraintError") {
    parsedError.statusCode = 409;
    parsedError.message = `${error.errors.map((e) => e.message).join(", ")}`;
  } else if (error.name === "SequelizeForeignKeyConstraintError") {
    parsedError.statusCode = 400;
    parsedError.message = "An error ocurred related to invalid reference keys";
  } else {
    parsedError.statusCode = 500;
    parsedError.message = "Sequelize error.";
  }

  return parsedError;
};

module.exports = sequelizeErrorParser;
