import { v4 as uuid } from 'uuid';

const getFields = ({ header }) => {
  const fields = [
    {
      id: uuid(),
      tag: 'heading',
      label: header,
    },
    {
      id: uuid(),
      label: 'First Name',
      tag: 'input',
      name: 'name',
      placeholder: 'First name',
      type: 'text',
      rules: [{ required: true }],
      initialValue: '',
    },
    {
      id: uuid(),
      label: 'stock',
      tag: 'input',
      name: 'stock',
      placeholder: 'stock',
      type: 'text',
      rules: [{ required: true }],
      initialValue: '',
    },
    {
      id: uuid(),
      label: 'price',
      tag: 'input',
      name: 'price',
      placeholder: 'price',
      type: 'text',
      rules: [{ required: true }],
      initialValue: '',
    },
    {
      id: uuid(),
      label: 'description',
      tag: 'input',
      name: 'description',
      placeholder: 'description',
      type: 'text',
      rules: [{ required: true }],
      initialValue: '',
    }
  ];

  const initialValues = fields.reduce((values, cuuField) => {
    let initialValuesObj = values;
    if (typeof (cuuField.initialValue) === "undefined") {
      return initialValuesObj;
    }
    initialValuesObj = {
      ...initialValuesObj,
      [cuuField.name]: cuuField.initialValue,
    };

    return initialValuesObj;
  }, {});
  console.log("initialValues", initialValues);
  return {
    initialValues,
    fields,
  };
};

export default getFields;
