module.exports = {
  name: {
    in: ["body"],
    isEmpty: { negated: true, errorMessage: "name cannot be empty" },
    isString: { errorMessage: "name must be a string" },
  },
};
