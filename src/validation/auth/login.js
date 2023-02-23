module.exports = {
  email: {
    in: ["body"],
    isEmpty: { negated: true, errorMessage: "email cannot be empty" },
    isString: true,
    isEmail: { errorMessage: "email must have valid format" },
  },
  password: {
    in: ["body"],
    isEmpty: { negated: true, errorMessage: "password cannot be empty" },
    isString: { errorMessage: "password must be a string" },
  },
};
