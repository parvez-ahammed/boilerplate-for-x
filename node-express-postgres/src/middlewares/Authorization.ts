import {
    adminPermissions,
    routePermission,
    userPermissions,
} from '@configs/premissions';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export const authorization = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const role = req.headers['x-role'];
            const method = req.method;
            const route = req.originalUrl;
            const permissions =
                role === '1' ? adminPermissions : userPermissions;
            const requiredPermission = routePermission[method]?.[route];

            if (!requiredPermission) {
                return next();
            }

            if (!permissions[method]?.includes(requiredPermission)) {
                res.status(httpStatus.FORBIDDEN).json({
                    message:
                        'Forbidden: You do not have permission to access this route',
                });
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
