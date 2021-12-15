import { Router } from 'express';

import metodsRoutes from './routes/metods.routes';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

export default () => {
	const app = Router();

	authRoutes(app);
	userRoutes(app);
	metodsRoutes(app);

	return app;
}