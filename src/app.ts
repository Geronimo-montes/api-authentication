import 'reflect-metadata'; // We need this in order to use @Decorators

// import Logger from './helpers/logger.helper';
import express from 'express';
import config from '@config';
import { Logger } from 'winston';
import Container from 'typedi';

async function startServer() {
    const app = express();

    await require('./helpers').default({ expressApp: app });
    const Log = <Logger>Container.get('logger');

    app.listen(config.PORT,
        () => Log.info(`🛡️🛡️ Server running: ${config.ROOT.URL} 🛡️🛡️`))
        .on('error', err => {
            Log.error('🔥🔥 error: %o 🔥🔥', err)
            process.exit(1);
        });
}

startServer();

    // Log.warn('🚦🚧⚠️   ⚠️🚧🚦');
    // Log.error('🔥🔥   🔥🔥')
    // Log.debug('🔎🔎   🔍🔍')warn
    // Log.info('🛡️🛡️   🛡️🛡️')
