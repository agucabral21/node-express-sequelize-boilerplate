/* eslint-disable no-plusplus */
module.exports = {
  firstName: {
    in: ["body"],
    isEmpty: { negated: true, errorMessage: "firstName cannot be empty" },
    isString: { errorMessage: "value must be a string" },
  },
  lastName: {
    in: ["body"],
    isEmpty: { negated: true, errorMessage: "lastName cannot be empty" },
    isString: { errorMessage: "value must be a string" },
  },
  email: {
    in: ["body"],
    isEmpty: { negated: true, errorMessage: "email cannot be empty" },
    isString: true,
    isEmail: { errorMessage: "email must have valid format" },
  },
  password: {
    in: ["body"],
    isString: { errorMessage: "value must be a string" },
    isLength: {
      options: { min: 8 },
      errorMessage: "password must have at least 8 characters",
    },
  },
};
