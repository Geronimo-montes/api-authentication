import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { Request } from 'express';

const dirPath = path.join(__dirname, '../../data/private');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (!fs.existsSync(dirPath))
			fs.mkdir(dirPath, (err) => {
				if (err) return cb(err, '');
			});

		cb(null, dirPath);
	},
	filename: async (req, file, cb) => {
		const filename = `${getFilename(file)}${path.extname(file.originalname)}`;
		cb(null, filename);
	},
});

/**
 * Funcion para validacion de tipo de archivo (mimetype)
 */
const fileFilter =
	(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
		const { idpaquete, iddocumento } = req.params;

		// documentoModel.getDocumentoById(Number(idpaquete), Number(iddocumento))
		// 	.then((f) =>
		// 		(file.mimetype !== Emimetype[<keyMime>f.formato]) ?
		// 			cb(new MulterError('LIMIT_UNEXPECTED_FILE')) :
		cb(null, true)
		// )
		// 	.catch((err) => new Error('Error de los errores de multer.'));
	};

/**
 * falta validar los limits del documento almacenados en la bd
 */
const uploadFile = multer({
	storage: storage,
	// LIMITANTES PARA EL ARCHIVO
	limits: {
		fieldSize: 2048,
		fieldNameSize: 200,
		files: 1,
	},
	// VALIDAMOS LA EXTENSION DEL ARCHIVO. DEBE CORRESPONDER A JPG O PNG
	fileFilter: fileFilter,
});

/**
 * Mimetype de los formatos soportados
 */
enum Emimetype {
	'pdf' = 'application/pdf',
	'png' = 'image/png',
	'jpg' = 'image/jpg',
}

type keyMime = keyof typeof Emimetype;

/**
 * Genera un nombre random de 20 caracteres
 */
const getFilename = (file: Express.Multer.File) => {
	// GENERAMOS NOMBRE RANDOM
	return `${(Math.random() + 1).toString(36).substring(0, 20).replace(/\./g, 'a')}`;
};

export default uploadFile;