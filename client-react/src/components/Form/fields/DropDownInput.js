// import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import { Form } from 'antd';
// import isEqual from 'react-fast-compare';
// import FloatLabel from '../FloatLabel';
// import DropDown from '../../DropDown';

// const DropDownInputField = (props) => {
//   const {
//     placeholder,
//     name,
//     value,
//     rules,
//     enableAddItem,
//     items,
//     mulitple,
//     getURL,
//     postURL,
//     labelValue,
//   } = props;
//   return (
//     <FloatLabel label={placeholder} value={value}>
//       <Form.Item
//         name={name}
//         rules={rules}
//       >
//         <DropDown
//           enableAddItem={enableAddItem}
//           name={name}
//           items={items}
//           text="Add New"
//           mode={mulitple ? 'tags' : null}
//           getURL={getURL}
//           postURL={postURL}
//           labelValue={labelValue}
//         />
//       </Form.Item>
//     </FloatLabel>
//   );
// };

// DropDownInputField.propTypes = {
//   placeholder: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//   ]),
//   rules: PropTypes.arrayOf(PropTypes.object).isRequired,
//   enableAddItem: PropTypes.bool,
//   items: PropTypes.arrayOf(PropTypes.string).isRequired,
//   mulitple: PropTypes.bool,
//   getURL: PropTypes.string,
//   postURL: PropTypes.string,
// };

// DropDownInputField.defaultProps = {
//   placeholder: '',
//   enableAddItem: false,
//   value: undefined,
//   mulitple: false,
//   getURL: null,
//   postURL: null,

// };

// const DropDownInput = memo(DropDownInputField, isEqual);

// export default DropDownInput;
