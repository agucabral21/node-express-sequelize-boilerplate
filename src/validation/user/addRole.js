/* eslint-disable no-plusplus */
module.exports = {
  roles: {
    in: ["body"],
    isArray: { errorMessage: "Roles must be an array" },
    isEmpty: { negated: true, errorMessage: "Roles cannot be empty" },
    custom: {
      options: (value) => {
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            if (!Number.isInteger(value[i])) {
              throw new Error("Roles must be an array of integers");
            }
          }
        }
        return true;
      },
    },
  },
  id: {
    in: ["params"],
    isInt: { errorMessage: "id must be an integer" },
  },
};
