import multer from 'multer';
import path from 'path';
import util from 'util';

/**
 * Extrae la extenion del archivo.
 * @param file 
 * @returns {string} Extension del archivo de la forma '.ext'
 */
export const getExtencionFile = (file: Express.Multer.File) => {
	const name = file.originalname; // capturamos el nombre
	return name.slice(name.indexOf('.')); // extraemos la extensión del archivo
}

/**
 * Guarda el archivo en la carpeta publica.
 * Parametros necesarios: [ file, name, ** ]
 */
let storagePrivate = multer.diskStorage({
	destination: (req, file, cb) => {
		const ruta: string = path.join(__dirname, '../private');

		cb(null, ruta);
	},
	filename: async (req, file, cb) => {
		const
			ext: string = getExtencionFile(file),
			name: string = `${req.params.name}${ext}`;

		cb(null, name);
	},
});

let uploadFile = multer({
	storage: storagePrivate,
}).single('file');

let uploadDocumentoMiddleware = util.promisify(uploadFile);
export default uploadDocumentoMiddleware;