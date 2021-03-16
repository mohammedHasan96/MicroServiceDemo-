import database from 'database';

/**
 * @description asyncHandler is a function used to wrap async routes
 * @param {function} fn the function or the controller which will be used for route
 * @return {*} result of executed function
 */
export default (fn) => async (request, response, next) => {
  const transaction = await database.sequelize.transaction();
  try {
    return await fn(request, response, next, transaction);
  } catch (error) {
    await transaction.rollback();
    return next(error);
  }
};
