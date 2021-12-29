import isAuth from './isAuth.middleware';
import validator from './validator.middleware';
import error from './error.middleware';
import notFound404 from './not-found.middleware';
import isAdmin from './isAdmin.middleware';
import uploadFiles from './upload-files.middleware';

export default {
  isAuth,
  isAdmin,
  uploadFiles,
  validator,
  error,
  notFound404,
};
