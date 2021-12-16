import isAuth from './isAuth.middleware';
import validator from './validator.middleware';
import uploadImages from './multer/image.middleware';

export default {
  isAuth,
  validator,
  uploadImages,

  /**
   * FALTA VERIFICAR UTILIDAD
   */
  // attachCurrentUser,
};
