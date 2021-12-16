import path from 'path';
import multer from 'multer';

import config from '@config';
import { Request } from 'express';
import { Logger } from 'winston';
import Container from 'typedi';

/**
 * 
 */
const storage = multer.diskStorage({
  destination: config.FILES.PRIVATE,

  filename: async (req, file, cb) => {
    const name = `${Math.random() + 1}`.substring(0, 20).replace(/\./g, 'a');
    const filename = `${name}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

/**
 * 
 */
const limits = {
  /** Maximum size of each form field name in bytes. (Default: 100) */
  fieldNameSize: 200,
  /** Maximum size of each form field value in bytes. (Default: 1048576) */
  fieldSize: 2048,
  /** Maximum number of non-file form fields. (Default: Infinity) */
  fields: 10,
  /** Maximum size of each file in bytes. (Default: Infinity) */
  fileSize: 100000000,
  /** Maximum number of file fields. (Default: Infinity) */
  files: 20,
  /** Maximum number of parts (non-file fields + files). (Default: Infinity) */
  // parts?: number | undefined;
  /** Maximum number of headers. (Default: 2000) */
  // headerPairs?: number | undefined;
};


/**
 * Funcion para validacion de tipo de archivo (mimetype)
 * 
 * @param req 
 * @param file 
 * @param cb 
 * @returns 
 */
const fileFilter = (
  req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback
) => {
  const Log = <Logger>Container.get('logger');
  const mimetype = ['image/png', 'image/jpg', 'image/jpeg'];
  Log.info(`⚠️🌐 🌐💻  Info: ${file.mimetype}  💻🌐 🌐⚠️`);

  if (!mimetype.includes(file.mimetype)) {
    /**
     * TODO: Implementes Error: TYPE_FILE_NOT_SUPORTED
     */
    const err = new Error('TYPE_FILE_NOT_SUPORTED');
    Log.error(`❗⚠️ 🔥👽  Error: ${err}  👽🔥 ⚠️❗`);
    return cb(err);
  }
  cb(null, true);
};

/**
 * 
 */
export default multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter,
});