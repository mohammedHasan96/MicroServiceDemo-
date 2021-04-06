import React, { useState } from 'react';
import { Form, Button } from 'antd';
import PropTypes from 'prop-types';
import FormField from './formField';

import './index.scss';

const FormFields = ({
  fields,
  onSubmit,
  formName,
  initialValues,
  className,
  buttonText,
  disabled,
}) => {
  const [form] = Form.useForm();
  const [fieldsState, setFieldsState] = useState(fields);
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = (values) => {
    setIsLoading(true);
    onSubmit(values, setIsLoading);
  };

  const onFieldsChange = (newFields) => {
    setFieldsState(newFields);
  };
  return (
    <Form
      form={form}
      name={formName}
      onFinish={onFinish}
      className={`form-fields ${className}`}
      initialValues={initialValues}
      fields={fieldsState}
      onFieldsChange={onFieldsChange}
    >
      {
        fields.map((element) => (
          <FormField
            key={element.id}
            element={element}
            getFieldValue={form.getFieldValue}
            setFieldsValue={form.setFieldsValue}
          />
        ))
      }
      {!disabled ? (
        <Form.Item className="submit-btn">
          <Button loading={isLoading} type="primary" htmlType="submit">
            {buttonText}
          </Button>
        </Form.Item>
      ) : null}
    </Form>
  );
};

FormFields.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object.isRequired,
  className: PropTypes.string,
  buttonText: PropTypes.string,
  disabled: PropTypes.bool,
};

FormFields.defaultProps = {
  className: '',
  buttonText: 'Submit',
  disabled: null,
};

export default FormFields;
