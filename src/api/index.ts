import { Router } from 'express';
import signIn from './routes/sign-in.routes';
import signUp from './routes/sign-up.routes';
import user from './routes/user.routes';
import auth_methods from './routes/auth-methods.routes';


export default () => {
	const app = Router();

	signIn(app);
	signUp(app);
	user(app);
	auth_methods(app);

	return app;
}