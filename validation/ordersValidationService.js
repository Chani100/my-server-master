
const config = require("config");
const validatorOption = config.get("validatorOption");
const joiOrderValidation = require("./joi/ordersValidation");

const orderValidationService = (userInput) => {
  if (validatorOption === "Joi") {
    return joiOrderValidation.validateOrdersSchema(userInput);
  }
  throw new Error("validator undefined");
};

module.exports = {
  orderValidationService,
};
