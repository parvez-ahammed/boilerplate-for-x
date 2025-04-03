import http from 'http';
import { app, checkDbConnection } from './app';
import { appConfig } from '@configs/config';
import logger from '@helpers/Logger';
logger.info('Hello from Dev Jots API!');

const server: http.Server = http.createServer(app);

async function startServer() {
    await checkDbConnection();
    server.listen(appConfig.port, () =>
        logger.info(`Server is running on http://localhost:${appConfig.port}`)
    );
}

startServer();
