const Joi = require("joi");

const idValidat = Joi.string()
  .length(24)
  .hex()
  .required()
  .messages({ "string.length": "The id must be 24 characters long" });

const validateIdSchema = (userInput) => {
  return idValidat.validateAsync(userInput);
};

module.exports = { validateIdSchema };
