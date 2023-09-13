const Joi = require("joi");

const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(256),
  description: Joi.string().min(2).max(1024),
  imageUrl: Joi.string().min(6).max(1024).allow(""),
  imageAlt: Joi.string().min(2).max(256).allow(""),
  price: Joi.number().min(1),
  category: Joi.string().min(2).max(256).allow(""),
  bizNumber: Joi.number().min(1000000).max(9999999).allow(""),
  user_id: Joi.string().hex().length(24),
});

const validateCardSchema = (userInput) => {
  return createCardSchema.validateAsync(userInput);
};

module.exports = {
  validateCardSchema,
};
