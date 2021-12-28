import isAuth from './isAuth.middleware';
import validator from './validator.middleware';
import multer from './multer';
import error from './error.middleware';
import notFound404 from './not-found.middleware';
import isAdmin from './isAdmin.middleware';

export default {
  isAuth,
  isAdmin,
  validator,
  multer,
  error,
  notFound404,
};
