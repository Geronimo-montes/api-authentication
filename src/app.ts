import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import path from 'path';
import config from './config/config';


// MIDDLEWARE DE PROTECCION DE RUTAS MEDIANTE ROLES
import {
  AuthAuxiliarMiddleware,
  AuthDirectorMiddleware,
  AuthJefaturaMiddleware
} from './middlewares/auth.middleware';
import { Erol } from './models/model.model';

// RUTAS
import authRoutes from './routes/auth.routes';
import alumnoRoutes from './routes/alumno.routes';
import unidadRoutes from './routes/unidad.routes';
import documentoRoutes from './routes/documento.routes';
import empleadoRoutes from './routes/empleado.routes';
import { ErrorHandler } from './errors/error.middleware';

const PORT = process.env.PORT || config.ASI_PORT;
const app = express();
app.set('port', PORT);

app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// ARCHIVOS ESTATICOS DE CARATER PUBLICO
app.use('/static', express.static(path.join(__dirname, '/public')));

// PROTECCION DE RUTAS MEDIANTE ROLES
app.use(passport.initialize());
passport.use(Erol.DIRECTOR, AuthDirectorMiddleware);
passport.use(Erol.JEFATURA, AuthJefaturaMiddleware);
passport.use(Erol.AUXILIAR, AuthAuxiliarMiddleware);

// MANEJO DE ERRORES


// RUTA DE PRUEBAS
app.get('/', (req, res) => res.send(`API DISPONIBLE EN http://localhost:${PORT}`));

// rutas
app.use('/auth', authRoutes);
app.use('/alumno', alumnoRoutes);
app.use('/unidad-academica', unidadRoutes);
app.use('/pack-documento', documentoRoutes);
app.use('/empleado', empleadoRoutes);

// MANEJADOR DE ERRORES
app.use(ErrorHandler);

export default app;