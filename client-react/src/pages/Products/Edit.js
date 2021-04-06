import React, { useState, useEffect } from 'react';
import getFields from './fields';
import Form from 'componets/Form';
import { useParams } from "react-router-dom";

function ProductCU() {
  const { fields, initialValues } = getFields({ header: 'Edit Product' });
  const [initial, setData] = useState(initialValues);
  const { id } = useParams();
  useEffect(() => {
    const product = {
      name: 'product, 1',
      stock: "25",
      price: "14.20",
      description: 'this product is very good product yes its :)',
    };
    setData(product);
  }, []);
  const onSubmit = () => {

  }
  return (
    <>
      { initial && initial.name &&
        <Form
          fields={fields}
          onSubmit={onSubmit}
          formName="Edit Product"
          initialValues={initial}
          buttonText="Edit"
        />
      }
    </>
  );
};

export default ProductCU;
