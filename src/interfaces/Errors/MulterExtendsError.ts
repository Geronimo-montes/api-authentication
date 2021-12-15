import { MulterError } from "multer";

type ErrorCode =
  | 'LIMIT_PART_COUNT'
  | 'LIMIT_FILE_SIZE'
  | 'LIMIT_FILE_COUNT'
  | 'LIMIT_FIELD_KEY'
  | 'LIMIT_FIELD_VALUE'
  | 'LIMIT_FIELD_COUNT'
  | 'LIMIT_UNEXPECTED_FILE'
  | 'TYPE_FILE_NOT_SUPORTED';

class MulterExtendsError extends MulterError {
  /** Name of the MulterError constructor. */
  name: string;
  /** Identifying error code. */
  code: ErrorCode;
  /** Descriptive error message. */
  message: string;
  /** Name of the multipart form field associated with this error. */
  field?: string | undefined;
}