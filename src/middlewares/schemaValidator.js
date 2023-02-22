const { checkSchema, validationResult } = require("express-validator");
const { errorResponse } = require("../utils/responses");

const schemaValidator = (schema) => async (req, res, next) => {
  // Run schema validation
  const validations = checkSchema(schema);
  await Promise.all(validations.map((validation) => validation.run(req)));
  // Check errors
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  const message = "Invalid data.";

  return res
    .status(400)
    .json(errorResponse({ message, errors: result.errors }));
};

module.exports = schemaValidator;
