const config = require("config");
const validatorOption = config.get("validatorOption");
const joiBookATable = require("./joi/bookATableValidat");

const bookValidationService = (userInput) => {
  if (validatorOption === "Joi") {
    return joiBookATable.validateBookATableSchema(userInput);
  }
  throw new Error("validator undefined");
};

module.exports = {
  bookValidationService,
};
