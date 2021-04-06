import React, { useState, useEffect } from 'react';
import getFields from './fields';
import Form from 'components/Form';

function ProductCU() {
  const { fields, initialValues } = getFields({ header: 'Create Product' });
  const [initial, setData] = useState(initialValues);

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
