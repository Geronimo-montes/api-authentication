import multer from 'multer';
import path from 'path';
import util from 'util';
import { getExtencionFile } from './file.middleware';

/**
 * Guarda el archivo en la carpeta publica.
 * Parametros necesarios: [ file, name, ** ]
 */
let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const ruta: string = path.join(__dirname, '../public');

		cb(null, ruta);
	},
	filename: async (req, file, cb) => {
		const
			ext: string = getExtencionFile(file),
			name: string = `${req.params.name}${ext}`;

		cb(null, name);
	}
});

const uploadPerfil = multer({
	storage: storage,
}).single('file');

const uploadPerfilMiddleware = util.promisify(uploadPerfil);
export default uploadPerfilMiddleware;