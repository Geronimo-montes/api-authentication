import express, { Request, Response, NextFunction, } from 'express';

import cors from 'cors';
import path from 'path';

import config from '@config';
import routes from '@api';
import Container from 'typedi';
import { Logger } from 'winston';

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
	app.use(`${config.API.PREFIX}/static`, express.static(public_dir));

	/**
	 * API ROUTES
	 */
	app.use(config.API.PREFIX, routes());
	app.get(`${config.API.PREFIX}/favicon.ico`, (req, res) => res.status(204));

	/**
	 * CATCH 404 AND FORWARD TO ERROR HANDLER
	 */
	app.use((req: Request, res: Response, next: NextFunction) => {
		const err = new Error('Not Found');
		err['status'] = 404
		next(err);
	});

	/**
	 * ERROR HANDLLER
	 */
	app.use((err, req, res, next) => {
		const Log = <Logger>Container.get('logger')
		Log.error(`🔥🔥 ${err} 🔥🔥`)
		return res.status(err.status || 500).json({ err }).end();
	});

	return app;
}