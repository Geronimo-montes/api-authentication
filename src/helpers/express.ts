import express, { Request, Response, NextFunction, } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import path from 'path';
import favicon from 'serve-favicon';

import { ResponseData } from '@models/response.model';
import config from '@config/config';
import routes from '@api/index';

export default ({ app }: { app: express.Application }) => {
	// 
	app.set('port', process.env.PORT || config.ASI_PORT);

	// 
	app.use(morgan('dev'));

	// 
	app.use(cors({
		// origin: 'http://localhost:4200'
	}));

	// 
	app.use(express.json());

	// 
	app.use(express.urlencoded({ extended: false }));

	// FAVICON
	app.use(favicon(path.join(__dirname, '../data/public', 'favicon.ico')))

	// ARCHIVOS ESTATICOS DE CARATER PUBLICO
	app.use(config.api.prefix + '/static', express.static(path.join(__dirname, '../data/public')));

	// MIDDLEWARE DE AUTENTICACION DE USUARIOS
	app.use(passport.initialize());

	// API ROUTES
	app.use(config.api.prefix, routes());

	/// catch 404 and forward to error handler
	app.use((req: Request, res: Response, next: NextFunction) => {
		next(new Error('Not Found'));
	});

	// ERROR HANDLE
	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		if (!err) return next();

		console.error({ err });

		return res
			.status(500)
			.json(new ResponseData(false, err.message, err))
			.end();
	});
}