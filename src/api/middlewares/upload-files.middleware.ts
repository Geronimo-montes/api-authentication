import fs from 'fs';
import path from 'path';
import multer from 'multer';

import config from '@config';
import { Request } from 'express';
import { Logger } from 'winston';
import Container from 'typedi';
import ServerError from '@errors/server.error';

/**
 * 
 */
const storage = multer.diskStorage({
  destination:
    config.PATH.PYTHON.DATA,

  filename:
    async (req, file, cb) => {
      const name = `${Math.random() + 1}`.substring(0, 6).replace(/\./g, 'a');
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
  fileSize: 5000000,
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
  const mimetype = ['image/png', 'image/jpg', 'image/jpeg', 'video/mp4', 'video/webm'];

  if (!mimetype.includes(file.mimetype))
    return cb(new ServerError('TYPE_FILE_NOT_SUPORTED'));

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