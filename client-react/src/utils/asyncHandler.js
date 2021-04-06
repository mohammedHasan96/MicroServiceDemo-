import { notification } from 'antd';

/**
 *
 * @param {function} asyncFun - requierd
 * @param {String} name - The name to show in the message text
 *
 * @description Handle async functions.
 * Catch any error and show message with error
 */
const asyncHandler = (asyncFun, name) => {
  if (typeof asyncFun !== 'function') {
    throw Error(`${asyncFun} is not a function`);
  }

  return (
    Promise
      .resolve(asyncFun())
      .catch((error) => {
        notification.error({
          message: `${name}: ${error.message}`,
          duration: 3,
        });
      })
  );
};

export default asyncHandler;
