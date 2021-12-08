import express from 'express';

async function startServer() {
    const app = express();

    await require('./helpers').default({ expressApp: app });
    
    app.listen(app.get('port'), () => {
        console.log(`Server on port ${app.get('port')}`);
    }).on('error', err => {
        console.error(err);
        process.exit(1);
    })
}

startServer();