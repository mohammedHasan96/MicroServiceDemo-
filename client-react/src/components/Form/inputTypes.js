const isTextInput = (tag, type) => tag === 'input' && type === 'text';
const isTextareaInput = (tag, type) => tag === 'input' && type === 'textarea';
const isNumberInput = (tag, type) => tag === 'input' && type === 'number';
const isPasswordInput = (tag, type) => tag === 'input' && type === 'password';
const isDatePickerInput = (tag) => tag === 'date';
const isSelectInput = (tag) => tag === 'select';
const isAutoComplete = (tag) => tag === 'autoComplete';
const isUploadInput = (tag) => tag === 'upload';
const isHeading = (tag) => tag === 'heading';
const isLanguage = (tag) => tag === 'languages';
const isPlaces = (tag) => tag === 'places';


export {
  isTextInput,
  isTextareaInput,
  isNumberInput,
  isDatePickerInput,
  isSelectInput,
  isUploadInput,
  isAutoComplete,
  isPasswordInput,
  isHeading,
  isLanguage,
  isPlaces,
};
