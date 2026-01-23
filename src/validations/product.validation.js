import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(150).required(),
  price: Joi.number().integer().min(0).required(),
  stock: Joi.number().integer().min(0).required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(150).optional(),
  price: Joi.number().integer().min(0).optional(),
  stock: Joi.number().integer().min(0).optional(),
});
