import jwt from 'jsonwebtoken'
import config from "@config";

import { JsonWebTokenError } from "jsonwebtoken";
import { UnauthorizedError } from "express-jwt";

import Container from 'typedi';
import { Logger } from 'winston';

/**
 * 
 * Authorization: Bearer ${JWT}
 * 
 * @param req 
 * @returns 
 */
const getTokenFromHeader = (req) => {
  const Log = <Logger>Container.get('logger');
  const headersAuth = req.headers.authorization;

  if (
    (headersAuth && headersAuth.split(' ')[0] === 'Token') ||
    (headersAuth && headersAuth.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  } else {
    Log.error('🔥🔥 Access Token Not Provider 🔥🔥');
    throw new JsonWebTokenError('Access Token Not Provider');
  }

}

const isAuth = (req, res, next) => {
  const Log = <Logger>Container.get('logger');
  const token = getTokenFromHeader(req);

  if (!token) {
    Log.error('🔥🔥 Invalid Access Token 🔥🔥');
    throw new JsonWebTokenError('Invalid Access Token');
  }

  jwt.verify(token, config.JWT.SECRET, (err, decoded) => {
    if (err) {
      Log.error(`🔥🔥 ${err} 🔥🔥`);
      throw new UnauthorizedError(err.code, { message: 'Invalid Token' });
    }

    req.User = decoded.user;

    next();
  });
};

// isAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "admin") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Admin Role!"
//       });
//       return;
//     });
//   });
// };

// isModerator = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "moderator") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Moderator Role!"
//       });
//     });
//   });
// };

// isModeratorOrAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "moderator") {
//           next();
//           return;
//         }

//         if (roles[i].name === "admin") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Moderator or Admin Role!"
//       });
//     });
//   });
// };

// const authJwt = {
// verifyToken: verifyToken,
// isAdmin: isAdmin,
// isModerator: isModerator,
// isModeratorOrAdmin: isModeratorOrAdmin
// };

export default isAuth;
