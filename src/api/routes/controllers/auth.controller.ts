import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '@services/auth.service';
import { IUserInputDTO } from '@interfaces/IUser.interface';
import { ResponseData } from '@utils/response';

/**
 * 
 */
export const SignUp =
	async (req: Request, res: Response, next: NextFunction) => {
		Container.get(AuthService)
			.SignUp(req.body as IUserInputDTO)
			.then(({ user, token }) => {

				console.log({ user, token });

				res.status(201).json(
					new ResponseData(true, 'Usuario Registrado', { user, token }));
			})
			.catch((err) => next(new Error(err.message)))
	};

/**
* 
*/
export const SignIn =
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		Container.get(AuthService)
			.SignIn(email, password)
			.then(({ user, token }) =>
				res.status(201).json(
					new ResponseData(true, 'Inicio de sesion exitoso', { user, token })))
			.catch((err) => next(new Error(err.message)))
	};