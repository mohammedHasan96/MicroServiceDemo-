import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import isEqual from 'react-fast-compare';
import FloatLabel from '../FloatLabel';

const PasswordInputField = (props) => {
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
        <Input.Password />
      </Form.Item>
    </FloatLabel>
  );
};

PasswordInputField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rules: PropTypes.arrayOf(PropTypes.object).isRequired,
};

PasswordInputField.defaultProps = {
  placeholder: '',
  value: undefined,
};

const PasswordInput = memo(PasswordInputField, isEqual);

export default PasswordInput;
