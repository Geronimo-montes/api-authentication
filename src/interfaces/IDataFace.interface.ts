export interface IDataFace {
  name: string;
  email: string;
  number_files: number;
}

export enum EArgs {
  ADDW = '--add_webcam',
  ADDG = '--add_galery',
  RECOGNIZEW = '--recognize_webcam',
  RECOGNIZEG = '--recognize_galery',
  TRAIN = '--train',
  NAME = '--name',
}