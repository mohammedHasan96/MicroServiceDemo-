import { verify } from 'jsonwebtoken';
import { dto, httpResponse } from 'helpers';
import config from 'config';
import { usersServices } from '../services';
const { authentication } = config;
const { secret } = authentication;


export const verifyToken = (userTypes = []) => async (request, response, next, transaction) => {
  // get cookies from the request
  const { cookies } = request;
  // if no cookies or token send unauthorized error
  if (!cookies || !cookies.token) {
    await transaction.rollback();
    return httpResponse.unAuthorized(response);
  }

  // verify the token
  return verify(cookies.token, secret, async (err, decoded) => {
    // if not valid send unauthorized error
    if (err) {
      response.clearCookie('token');
      await transaction.rollback();
      return httpResponse.unAuthorized(response);
    }

    // get the user ID from token
    const { id } = decoded;
    const filter = dto.generalDTO.filterData({ id });
    const user = await usersServices.getUserProfileAuth(filter, transaction);
    // check ban in findUser
    if (user && userTypes.includes(user.userType) && user.ban === false && user.active === false) {
      delete user.password;
      request.user = user;
      await transaction.commit();
      return next();
    }

    response.clearCookie('token');
    await transaction.rollback();
    return httpResponse.unAuthorized(response);
  });
};

export const verifyTokenAndEnter = (userTypes = []) => async (request, response, next, transaction) => {
  // get cookies from the request
  const { cookies } = request;
  request.user = {};
  // if no cookies or token send unauthorized error
  if (!cookies || !cookies.token) {
    await transaction.commit();
    return next();
  }
  // verify the token
  return verify(cookies.token, secret, async (err, decoded) => {
    // if not valid send unauthorized error
    if (err) {
      response.clearCookie('token');
      await transaction.rollback();
      return httpResponse.unAuthorized(response);
    }
    // get the user ID from token
    const { id } = decoded;
    const filter = dto.generalDTO.filterData({ id });
    const user = await usersServices.findUser(filter, transaction);
    delete user.password;
    request.user = {};
    if (user && userTypes.includes(user.userType)) {
      request.user = user;
    }
    await transaction.commit();
    return next();
  });
};
