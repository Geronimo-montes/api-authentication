import express from 'express';
import cors from 'cors';
import path from 'path';

import config from '@config';
import routes from '@api';
import { HttpCode } from '@interfaces/codes.interface';
import middlewares from '@api/middlewares';

export default ({ app }: { app: express.Application }) => {
	/**
	 * PUERTO, HEADERS, FORMATO DE RESPUESTA
	 */
	app.set('port', process.env.PORT || config.API.PORT);
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
	app.get(`${config.API.PREFIX}/favicon.ico`, (req, res) =>
		res.status(HttpCode.C2XX.No_Content));

	/**
	 * ERROR HANDLLER
	 */
	app.use(middlewares.notFound404);
	app.use(middlewares.error);

	return app;
}