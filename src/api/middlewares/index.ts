import isAuth from './isAuth.middleware';
import validator from './validator.middleware';
import uploadFiles from './multer.middleware';

export default {
  isAuth,
  validator,
  uploadFiles,

  /**
   * FALTA VERIFICAR UTILIDAD
   */
  // attachCurrentUser,
};
