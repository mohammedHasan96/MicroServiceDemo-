
import joi from '@hapi/joi';

export const productsParamsValidation = joi.object({
  id: joi.string().required(),
});

export const createProductsValidation = joi.object({
  name: joi.string().required(),
  stock: joi.number().required(),
  price: joi.number().required(),
  description: joi.string().required(),
});

export const updateProductsValidation = joi.object({
  name: joi.string().optional(),
  stock: joi.number().optional(),
  price: joi.number().optional(),
  description: joi.string().optional()
});
