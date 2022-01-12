import { Router } from 'express';
import arduino from './routes/arduino.routes';
import signIn from './routes/sign-in.routes';
import signOut from './routes/sign-out.routes';
import signUp from './routes/sign-up.routes';
import state from './routes/state.routes';
import user from './routes/user.routes';


export default () => {
	const app = Router();

	state(app);
	signIn(app);
	signUp(app);
	signOut(app);
	user(app);
	arduino(app);

	return app;
}