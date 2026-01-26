const Joi = require('joi');

exports.createProductSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().optional(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().optional(),
  imageUrl: Joi.string().uri().optional()
});
