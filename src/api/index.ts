import { Router } from 'express';
import appRoutes from './routes/app.routes';
import authRoutes from './routes/auth.routes';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	// RUTA DE EJEMPLO
	appRoutes(app);
	authRoutes(app);

	return app
}