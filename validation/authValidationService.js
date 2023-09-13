const config = require("config");
const joiRegisterValidation = require("./joi/registerValidation");
const joiLoginValidation  = require("./joi/loginValidation");


const validatorOption = config.get("validatorOption");

const registerUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiRegisterValidation.validateRegisterSchema(userInput);
  }
  throw new Error("validator undefined");
};

const validateLoginSchema = (userInput) => {
  if (validatorOption === "Joi") {
    return joiLoginValidation.validateLoginSchema(userInput);
  }
  throw new Error("validator undefined");
};

module.exports = {
  registerUserValidation,
  validateLoginSchema,
};
