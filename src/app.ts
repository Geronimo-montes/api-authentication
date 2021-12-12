import 'reflect-metadata'; // We need this in order to use @Decorators

import Logger from './helpers/logger.helper';
import express from 'express';
import config from '@config';

async function startServer() {
    const app = express();

    await require('./helpers').default({ expressApp: app });
    app.listen(config.PORT, () => {
        Logger.info(`
        ################################################
        🛡️  Server listening on port: ${app.get('port')} 🛡️
        ################################################
        http://localhost:3000/api/`);
    }).on('error', err => {
        Logger.error(err)
        process.exit(1);
    })
}

startServer();