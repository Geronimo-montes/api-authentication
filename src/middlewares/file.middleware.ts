import multer from 'multer';
import path from 'path';

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
export const PUBLIC_STORAGE = multer.diskStorage({
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
