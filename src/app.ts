import 'reflect-metadata';

import express from 'express';
import config from '@config';
import { Logger } from 'winston';
import Container from 'typedi';

async function startServer() {
    const app = express();

    await require('./helpers').default({ expressApp: app });
    const Log = <Logger>Container.get('logger');

    app.listen(config.API.PORT,
        () =>
            Log.info(`🌐💻 Server running: ${config.API.URL} 🌐💻`))
        .on('error',
            err => {
                Log.error(`❗⚠️ 🔥👽  Error: ${err}  👽🔥 ⚠️❗`);
                process.exit(1);
            });
}

startServer();