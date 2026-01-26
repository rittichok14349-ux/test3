const Joi = require('joi');

exports.createMemberSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  address: Joi.string().optional()
});
