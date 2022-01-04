export interface IFaceId {
  _id?: string;
  _id_user: string;
  number_files: number;
  index: number,
  create_date: string,
  update_date: string,
}

export enum EArgs {
  ADDW = '--add_webcam',
  ADDG = '--add_galery',
  ADDG_DB = '--add_galery_to_db',
  RECOGNIZEW = '--recognize_webcam',
  RECOGNIZEG = '--recognize_galery',
  TRAIN = '--train',
  NAME = '--name',
}