import { createValidator } from 'express-joi-validation';

/**
 * @description validateQuery is a function used to validate request body
 * with validation schema
 * @param {object} body request body
 * @return {object} validation result
 */
export const validateQuery = (body) => createValidator({ passError: true }).query(body);
export const validateBody = (body) => createValidator({ passError: true }).body(body);
export const validateParams = (body) => createValidator({ passError: true }).params(body);
