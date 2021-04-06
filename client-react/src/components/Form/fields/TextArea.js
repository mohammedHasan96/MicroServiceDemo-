import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import isEqual from 'react-fast-compare';
import FloatLabel from '../FloatLabel';

const TextAreaField = (props) => {
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
        <Input.TextArea
          autoSize={{ minRows: 4, maxRows: 8 }}
        />
      </Form.Item>
    </FloatLabel>
  );
};

TextAreaField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rules: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TextAreaField.defaultProps = {
  placeholder: '',
  value: undefined,
};

const TextArea = memo(TextAreaField, isEqual);

export default TextArea;
