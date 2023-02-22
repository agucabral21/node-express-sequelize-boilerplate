module.exports = {
  email: {
    in: ["body"],
    isEmpty: { negated: true, errorMessage: "email cannot be empty" },
    isString: { errorMessage: "email must be a string" },
  },
  password: {
    in: ["body"],
    isEmpty: { negated: true, errorMessage: "password cannot be empty" },
    isString: { errorMessage: "password must be a string" },
  },
};
