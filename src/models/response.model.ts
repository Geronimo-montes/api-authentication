export class ResponseData {
  data: any;
  response: boolean = false;
  message: string = 'Not Found.';

  constructor(response?: boolean, message?: string, data?: any) {
    this.data = data;
    this.response = response;
    this.message = message;

    if (!response && message === '' && data === null) {
      this.response = true;
      this.message = '';
    }
  }
}