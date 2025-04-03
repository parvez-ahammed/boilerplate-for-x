import logger from '@helpers/Logger';
import { applyGlobalMiddlewares } from '@middlewares/ApplyGlobalMiddlewares';
import express, { Express } from 'express';

import routes from '@routes/routes';
import { db } from 'knexfile';

import { applyGlobalErrorHandler } from '@middlewares/ApplyGlobalErrorHandler';

export const app: Express = express();

applyGlobalMiddlewares(app);
app.use('/api', routes);
applyGlobalErrorHandler(app);

export async function checkDbConnection() {
    try {
        await db.raw('SELECT 1+1 AS result');
        logger.info('Database connection established');
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}
