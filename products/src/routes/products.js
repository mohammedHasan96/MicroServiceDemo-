
import express from 'express';
import { productsControllers } from 'controllers';
import asyncHandler from 'middleware/asyncHandler';
import { productsValidation } from 'validations';
import { validateBody, validateParams } from 'middleware/validate';
const router = express.Router();

router
  .get('/products', asyncHandler(productsControllers.listAllProducts))
  .get(
    '/products/:id',
    validateParams(productsValidation.productsParamsValidation),
    asyncHandler(productsControllers.listProduct)
  )
  .post(
    '/products',
    validateBody(productsValidation.createProductsValidation),
    asyncHandler(productsControllers.createProducts)
  )
  .put(
    '/products/:id',
    validateParams(productsValidation.productsParamsValidation),
    validateBody(productsValidation.updateProductsValidation),
    asyncHandler(productsControllers.updateProducts)
  )
  .delete(
    '/products/:id',
    validateParams(productsValidation.productsParamsValidation),
    asyncHandler(productsControllers.deleteProducts)
  );

export default router;
