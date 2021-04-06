import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker } from 'antd';
import isEqual from 'react-fast-compare';
import FloatLabel from '../FloatLabel';

const DatePickerInputField = (props) => {
  const {
    placeholder,
    name,
    value,
    rules,
    disabled,
  } = props;
  return (
    <FloatLabel label={placeholder} value={value}>
      <Form.Item
        name={name}
        rules={rules}
      >
        <DatePicker
          disabled={disabled}
          placeholder={null}
          style={{ width: '100%' }}
        />
      </Form.Item>
    </FloatLabel>
  );
};

DatePickerInputField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  rules: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool,
};

DatePickerInputField.defaultProps = {
  placeholder: '',
  disabled: false,
  value: undefined,
};

const DatePickerInput = memo(DatePickerInputField, isEqual);

export default DatePickerInput;
