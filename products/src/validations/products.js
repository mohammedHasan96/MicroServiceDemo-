
import joi from '@hapi/joi';

export const productsParamsValidation = joi.object({
  id: joi.string().required(),
});
export const createProductsValidation = joi.object({
  name: joi.string().required(),
});

export const updateProductsValidation = joi.object({
  name: joi.string().required(),
});

