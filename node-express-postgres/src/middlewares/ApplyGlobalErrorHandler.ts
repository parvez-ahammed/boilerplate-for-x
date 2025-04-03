import { Request, Response, NextFunction, Express } from 'express';
import ApiError from '@helpers/ApiError';
import httpStatus from 'http-status';

export const applyGlobalErrorHandler = (app: Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(
            new ApiError(
                httpStatus.NOT_FOUND,
                `Not Found - ${req.originalUrl} does not exist`
            )
        );
    });
    app.use(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (error: ApiError, req: Request, res: Response, next: NextFunction) => {
            error.statusCode = error.statusCode || 500;

            res.status(error.statusCode).send({ message: error.message });
        }
    );
};
