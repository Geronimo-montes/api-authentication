export class ResponseData {
  data: any;
  response: boolean = false;
  message: string = 'Ocurrio un error inesperado';


  constructor(response: boolean, message: string, data: any) {
    this.data = data;
    this.response = response;
    this.message = message;

    if (!response && message === '' && data === null) {
      this.response = true;
      this.message = 'Ocurrio un error inesperado';
    }
  }
}