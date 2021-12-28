import jwt from 'express-jwt'
import config from "@config";

/**
 * Authorization: Bearer ${JWT}
 * @param req 
 * @returns 
 */
const getTokenFromHeader = (req) => {
  const headersAuth = req.headers.authorization;

  if (
    (headersAuth && headersAuth.split(' ')[0] === 'Token') ||
    (headersAuth && headersAuth.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  } else {
    return null;
  }

}

/**
 * Meddleaware de verificacion de credenciales de usuario
 */
const isAuth = jwt({
  secret: config.JWT.SECRET, // The _secret_ to sign the JWTs
  algorithms: ['sha1', 'RS256', 'HS256'],
  // algorithms: [config.JWT.ALGORITHM], // JWT Algorithm
  userProperty: 'token', // Use req.token to store the JWT
  getToken: getTokenFromHeader, // How to extract the JWT from the request
});

export default isAuth;
