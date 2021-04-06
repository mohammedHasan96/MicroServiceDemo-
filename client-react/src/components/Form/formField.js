import React from 'react';
import PropTypes from 'prop-types';
import {
  isTextInput, isTextareaInput,
  isNumberInput, isDatePickerInput,
  isSelectInput, isUploadInput,
  isPasswordInput, isHeading,
} from './inputTypes';
import TextInput from './fields/TextInput';
import TextArea from './fields/TextArea';
import NumberInput from './fields/NumberInput';
import PasswordInput from './fields/PasswordInput';
import DatePickerInput from './fields/DatePickerInput';
import DropDownInput from './fields/DropDownInput';
import UploadInput from './fields/UploadInput';

const FormField = ({
  element, getFieldValue, setFieldsValue, disabled,
}) => {
  const {
    tag,
    type,
    placeholder,
    rules,
    name,
    enableAddItem,
    items,
    dependency,
    dependencyValue,
    mulitple,
    prefix,
    getURL,
    postURL,
    label,
    labelValue,
  } = element;


  const renderField = () => {
    // Show text input if there is no dependency
    // or there is a dependency but no dependency value
    // or there is a dependency and the dependencyValue
    // should match a specific value
    if ((isTextInput(tag, type) && !dependency)
      || (isTextInput(tag, type) && dependency && !dependencyValue)
      || (isTextInput(tag, type) && dependency && dependencyValue === getFieldValue(dependency))
      || (isTextInput(tag, type) && dependency && typeof dependency === 'object'
        && dependencyValue === getFieldValue(dependency[0]))) {
      return (
        <TextInput
          name={name}
          placeholder={placeholder}
          prefix={prefix}
          rules={rules}
          type={type}
          value={getFieldValue(name)}
        />
      );
    }

    if (isTextareaInput(tag, type)) {
      return (
        <TextArea
          name={name}
          placeholder={placeholder}
          rules={rules}
          value={getFieldValue(name)}
        />
      );
    }

    if (isNumberInput(tag, type)) {
      return (
        <NumberInput
          name={name}
          placeholder={placeholder}
          rules={rules}
          value={getFieldValue(name)}
        />
      );
    }

    if (isPasswordInput(tag, type)) {
      return (
        <PasswordInput
          name={name}
          placeholder={placeholder}
          rules={rules}
          value={getFieldValue(name)}
        />
      );
    }

    if ((isDatePickerInput(tag) && !dependency)
      || (isDatePickerInput(tag) && dependency && !dependencyValue)
      || (isDatePickerInput(tag) && dependency && dependencyValue === getFieldValue(dependency))) {
      return (
        <DatePickerInput
          name={name}
          placeholder={placeholder}
          rules={rules}
          value={getFieldValue(name)}
          disabled={disabled}
        />
      );
    }

    if ((isSelectInput(tag) && !dependency)
      || (isSelectInput(tag) && dependency && !dependencyValue)
      || (isSelectInput(tag) && dependency && dependencyValue === getFieldValue(dependency))) {
      return (
        <DropDownInput
          enableAddItem={enableAddItem}
          getURL={getURL}
          postURL={postURL}
          items={items}
          mulitple={mulitple}
          name={name}
          placeholder={placeholder}
          rules={rules}
          value={getFieldValue(name)}
          labelValue={labelValue}
        />
      );
    }

    if (isUploadInput(tag)) {
      return (
        <UploadInput
          label={label}
          name={name}
          rules={rules}
        />
      );
    }

    if (isHeading(tag)) {
      return (
        <h1 className="form-heading">{label}</h1>
      );
    }


    return null;
  };

  return renderField();
};

FormField.propTypes = {
  element: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    type: PropTypes.string,
  }).isRequired,
  getFieldValue: PropTypes.func.isRequired,
  setFieldsValue: PropTypes.func.isRequired,

};

export default FormField;
