import { Router } from 'express';
import signIn from './routes/sign-in.routes';
import signOut from './routes/sign-out.routes';
import signUp from './routes/sign-up.routes';
import user from './routes/user.routes';


export default () => {
	const app = Router();

	signIn(app);
	signUp(app);
	signOut(app);
	user(app);

	return app;
}