import { Router } from 'express';
import authRoutes from './routes/auth.routes';

export default () => {
	const app = Router();

	authRoutes(app);

	return app
}