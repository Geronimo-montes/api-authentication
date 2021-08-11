import {
	Request,
	Response
} from 'express';
import { ResponseData } from '../config/response';
var fs = require('fs');


// function to encode file data to base64 encoded string
const base64_encode = (file: string) => {
	// read binary data
	var bitmap = fs.readFileSync(file);
	// convert binary data to base64 encoded string
	return new Buffer(bitmap).toString('base64');
}

export const GetImgPerfil = (req: Request, res: Response) => {
	const file = './default.png';
	const data = base64_encode(file);

	return res.status(400)
		.json(new ResponseData(true, '.', data));

}