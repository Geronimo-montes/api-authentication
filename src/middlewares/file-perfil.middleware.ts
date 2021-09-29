import path from 'path';
import multer, { MulterError } from 'multer';
import { Request } from 'express';

/**
 * Establece las configuraciones basicas de la ruta publica, asi como, un metodo para nombrar los archivos sin repetir nombres.
 */
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const ruta: string = path.join(__dirname, '../public');
		cb(null, ruta);
	},
	filename: async (req, file, cb) => {

		const name: string =
			`${(Math.random() + 1).toString(36).substring(0, 20).replace(/\./g, 'a')}${getExtencionFile(file)}`;
		cb(null, name);
	},
});

/**
 * Funcion para validacion de tipo de archivo (mimetype)
 */
const fileFilter =
	(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
		const mimetype = ['image/png', 'image/jpg'];
		if (!mimetype.includes(file.mimetype)) {
			return cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
		}
		cb(null, true);
	};

const uploadPerfil = multer({
	storage: storage,
	// LIMITANTES PARA EL ARCHIVO
	limits: {
		fieldSize: 2048,
		fieldNameSize: 200,
		// files: 1,
	},
	// VALIDAMOS LA EXTENSION DEL ARCHIVO. DEBE CORRESPONDER A JPG O PNG
	fileFilter: fileFilter,
});

/**
 * Extrae la extenion del archivo.
 * @param file 
 * @returns {string} Extension del archivo de la forma '.ext'
 */
export const getExtencionFile = (file: Express.Multer.File) => {
	const name = file.originalname; // capturamos el nombre
	return name.slice(name.indexOf('.')); // extraemos la extensión del archivo
}

export default uploadPerfil;