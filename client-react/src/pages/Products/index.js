import React, { useState, useEffect } from 'react';
import getFields from './fields';
import Form from 'componets/Form';

function ProductCU() {
  const { fields, initialValues } = getFields();
  const [initial, setData] = useState(initialValues);
  useEffect(() => {
    const products = [{
      name: 'product, 1',
      stock: 25,
      price: 14.20,
      description: 'this product is very good product yes its :)',
    }, {
      name: 'product, 1',
      stock: 25,
      price: 14.20,
      description: 'this product is very good product yes its :)',
    }, {
      name: 'product, 1',
      stock: 25,
      price: 14.20,
      description: 'this product is very good product yes its :)',
    }];
    setData(products);
  }, []);

  const onSubmit = () => {

  };
  return (
    <Form
      fields={fields}
      onSubmit={onSubmit}
      formName="add-product"
      initialValues={initial}
      buttonText="Add Product"
    />
  );

};

export default ProductCU;
