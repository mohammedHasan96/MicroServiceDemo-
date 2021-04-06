import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber } from 'antd';
import isEqual from 'react-fast-compare';
import FloatLabel from '../FloatLabel';

const NumberInputField = (props) => {
  const {
    placeholder,
    name,
    value,
    rules,
  } = props;
  return (
    <FloatLabel label={placeholder} value={value}>
      <Form.Item
        name={name}
        rules={rules}
      >
        <InputNumber />
      </Form.Item>
    </FloatLabel>
  );
};

NumberInputField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rules: PropTypes.arrayOf(PropTypes.object).isRequired,
};

NumberInputField.defaultProps = {
  placeholder: '',
  value: undefined,
};

const NumberInput = memo(NumberInputField, isEqual);

export default NumberInput;
