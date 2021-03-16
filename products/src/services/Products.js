
import database from 'database';

const { products: Products } = database;

export const getAllProducts = async (transaction) => {
  const products = await Products.findAll({ transaction });
  return products;
};

export const getProduct = async (filter, transaction) => Products.findOne({ ...filter, transaction });

export const createProduct = async (data, transaction) => Products.create(data, { transaction });

export const updateProduct = async (filter, data, transaction) => Products.update(data, { ...filter, transaction });

export const deleteProduct = async (filter, transaction) => {
  const product = await Products.destroy({ ...filter, transaction });
  return product;
};
