import express, { Request, Response, NextFunction, } from 'express';

import cors from 'cors';
import path from 'path';

import { ResponseData } from '@models/response.model';
import config from '@config';
import routes from '@api/index';

export default ({ app }: { app: express.Application }) => {
	/**
	 * Rutas para verificar el estado del servidor
	 */
	app.get(`${config.API.PREFIX}/status`, (req, res) => res.status(200).end());
	app.head(`${config.API.PREFIX}/status`, (req, res) => res.status(200).end());

	/**
	 * PUERTO, HEADERS, FORMATO DE RESPUESTA
	 */
	app.set('port', process.env.PORT || config.PORT);
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	/**
	 * PUBLIC FILES
	 */
	const public_dir = path.join(__dirname, '../assets/public');
	app.use(config.API.PREFIX + '/static', express.static(public_dir));

	/**
	 * API ROUTES
	 */
	app.use(config.API.PREFIX, routes());
	app.get('/favicon.ico', (req, res) => res.status(204));

	/**
	 * CATCH 404 AND FORWARD TO ERROR HANDLER
	 */
	app.use((req: Request, res: Response, next: NextFunction) => {
		const err = new Error('Not Found');
		err['status'] = 404
		next(err);
	});

	/**
	 * ERROR HANDLERS
	 */
	app.use((err, req, res, next) => {
		if (err.name === 'UnauthorizedError')
			return res
				.status(err.status)
				.send({ message: err.message })
				.end();

		return next(err);
	});

	app.use((err, req, res, next) => {
		return res
			.status(err.status || 500)
			.json(new ResponseData(false, err.message, err))
			.end();
	});

	return app;
}