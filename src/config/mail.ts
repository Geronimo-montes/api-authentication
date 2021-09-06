import nodemailer, { TransportOptions } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import CONFIG from './config';

class Mail {

	private transport;
	private serice: string = 'gmail';
	private asunto: string = 'Documentación faltante.';
	private body: string = 'Se requere que envie l documentacion indicada: ...';
	private destinatario: string[] = [];

	constructor() {
		this.transport = nodemailer.createTransport({
			service: this.serice,
			auth: {
				user: CONFIG.MAIL.EMAIL,
				pass: CONFIG.MAIL.PASSWORD
			}
		});
	}

	private getOptions(destinatario: string): any {
		return {
			from: CONFIG.MAIL.EMAIL,
			to: destinatario,
			subject: this.asunto,
			text: this.body,
		}
	}

	public async sendMail(destinatario: string) {
		this.transport.sendMail(this.getOptions(destinatario), (err, info) => {
			if (err) { console.log({ err }); throw err; }
			else {
				console.log('Email enviado: ' + info.response);
				return info;
			}
		});
	}
}

export default new Mail();