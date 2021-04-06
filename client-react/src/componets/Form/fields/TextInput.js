import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import isEqual from 'react-fast-compare';
import FloatLabel from '../FloatLabel';

const TextInputField = (props) => {
  const {
    placeholder,
    name,
    value,
    rules,
    type,
    prefix,
  } = props;
  return (
    <FloatLabel label={placeholder} value={value}>
      <Form.Item
        name={name}
        rules={rules}
      >
        <Input
          type={type}
          prefix={value ? prefix : null}
        />
      </Form.Item>
    </FloatLabel>
  );
};

TextInputField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rules: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  prefix: PropTypes.string,
};

TextInputField.defaultProps = {
  placeholder: '',
  prefix: null,
  value: undefined,
};

const TextInput = memo(TextInputField, isEqual);

export default TextInput;
