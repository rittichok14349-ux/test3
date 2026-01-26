const Joi = require('joi');

exports.createOrderSchema = Joi.object({
  orderNumber: Joi.string().required(),
  customerName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  totalAmount: Joi.number().positive().required()
});
