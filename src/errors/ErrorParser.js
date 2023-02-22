const SequelizeErrorParser = require("./SequelizeErrorParser");

const ErrorParser = (err) => {
  let parsedError = {
    statusCode: 500,
    message: "Internal Server Error",
  };

  if (err.name) {
    if (err.name.startsWith("Sequelize")) {
      parsedError = SequelizeErrorParser(err);
    }
  }
  parsedError.stack = err.stack;
  return parsedError;
};

module.exports = ErrorParser;
