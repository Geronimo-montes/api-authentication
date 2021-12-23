import isAuth from './isAuth.middleware';
import validator from './validator.middleware';
import multerMiddleware from './multer';

export default {
  isAuth,
  validator,
  multerMiddleware,
};
