
import { productsServices } from 'services';
import { dto, httpResponse } from 'helpers';

export const listAllProducts = async (request, response, _next, transaction) => {
  const products = await productsServices.getAllProducts(transaction);
  transaction.commit();
  return httpResponse.ok(response, products);
};

export const listProduct = async (request, response, _next, transaction) => {
  const params = dto.generalDTO.paramsData(request);
  const id = dto.productsDTO.productsId(params);
  const filter = dto.generalDTO.filterData({ id });
  const product = await productsServices.getProduct(filter, transaction);
  if (!product) {
    transaction.commit();
    return httpResponse.badRequest(response, 'Products not exists');
  }
  transaction.commit();
  return httpResponse.ok(response, product);
};

export const createProducts = async (request, response, _next, transaction) => {
  const body = dto.generalDTO.bodyData(request);

  const productData = dto.productsDTO.productsData(body);
  const product = await productsServices.createProduct(
    productData,
    transaction
  );

  transaction.commit();

  return httpResponse.created(
    response,
    product,
    'product has been created'
  );
};

export const deleteProducts = async (request, response, _next, transaction) => {
  const paramsData = dto.generalDTO.paramsData(request);
  const id = dto.productsDTO.productsId(paramsData);
  const filter = dto.generalDTO.filterData({ id });

  const product = await productsServices.deleteProduct(filter, transaction);
  if (!product) {
    transaction.commit();
    return httpResponse.badRequest(response, 'Products not exists');
  }
  transaction.commit();
  return httpResponse.ok(response, {}, 'Products Deleted');
};

export const updateProducts = async (request, response, _next, transaction) => {
  const bodyData = dto.generalDTO.bodyData(request);
  const paramsData = dto.generalDTO.paramsData(request);
  const id = dto.productsDTO.productsId(paramsData);
  const productData = dto.productsDTO.productsData(bodyData);
  const filter = dto.generalDTO.filterData({ id });
  const [count] = await productsServices.updateProduct(filter, productData, transaction);

  let data = {};
  if (count) {
    data = await productsServices.getProduct(filter, transaction);
    // public event to event bus
    const message = {
      event: 'animale',
      body: {
        msg: 'i like you',
      }
    };
  }
  transaction.commit();
  return httpResponse.ok(response, data);
};
