import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import path from 'path';
import config from './config/config';

// RUTAS
import authRoutes from './routes/auth.routes';
import alumnoRoutes from './routes/alumno.routes';
import unidadRoutes from './routes/unidad.routes';
import paqueteDocumentosRoutes from './routes/paquete-documentos.routes';
import documentosRoutes from './routes/documento.routes';
import empleadoRoutes from './routes/empleado.routes';

import ErrorHandler from './middlewares/error-handler.middleware';
import ErrorHandlerMulter from './middlewares/error-multer.middleware';
import alumnoModel from './models/alumno.model';
import { ResponseData } from './config/response';

// CONFIGURACIONES NECESARIAS PARA EXPRESS
const PORT = process.env.PORT || config.ASI_PORT;
const app = express();
app.set('port', PORT);
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ARCHIVOS ESTATICOS DE CARATER PUBLICO
app.use('/static', express.static(path.join(__dirname, '/public')));

// MIDDLEWARE DE AUTENTICACION DE USUARIOS
app.use(passport.initialize());

// RUTAS
app.use('/auth', authRoutes);
app.use('/alumno', alumnoRoutes);
app.use('/unidad-academica', unidadRoutes);
app.use('/pack-documento', paqueteDocumentosRoutes);
app.use('/documento', documentosRoutes);
app.use('/empleado', empleadoRoutes);

// RUTA DE PRUEBAS
app.get('/', (req, res) => {
	return res.status(200).json(new ResponseData(true, 'data', { data: 'data' }));
});

// MANEJADOR DE ERRORES
app.use(ErrorHandlerMulter);
app.use(ErrorHandler);

export default app;
