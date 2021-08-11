import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import config from './config/config';

import { Erol } from './models/model.model';
import {
  AuthAuxiliarMiddleware,
  AuthDirectorMiddleware,
  AuthJefaturaMiddleware
} from './middlewares/auth.middleware';

import authRoutes from './routes/auth.routes';
import alumnoRoutes from './routes/alumno.routes';
import unidadRoutes from './routes/unidad.routes';
import documentoRoutes from './routes/documento.routes';
import empleadoRoutes from './routes/empleado.routes';
import fileRoutes from './routes/file.routes';

// asignamos el puerto de esucha de la api-rest
const PORT = process.env.PORT || config.ASI_PORT;
const app = express();
app.use(fileUpload());

// configuracion
app.set('port', PORT);

// middlawares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

// Proteccion de rutas mediante privilegios
passport.use(Erol.DIRECTOR, AuthDirectorMiddleware);
passport.use(Erol.JEFATURA, AuthJefaturaMiddleware);
passport.use(Erol.AUXILIAR, AuthAuxiliarMiddleware);

// ruta de prueba
app.get('/', (req, res) => {
  res.send(`La API esta seteada en http://localhost:${PORT}`);
});

// carpeta public
app.use('/static', express.static(__dirname + '/public'));

// rutas
app.use('/auth', authRoutes);
app.use('/alumno', alumnoRoutes);
app.use('/unidad-academica', unidadRoutes);
app.use('/pack-documento', documentoRoutes);
app.use('/empleado', empleadoRoutes);
app.use('/file', fileRoutes);

export default app;