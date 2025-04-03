/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import ApiError from '@helpers/ApiError';
import passport from 'passport';
import { UserPayload } from '@interfaces/IUserPayload';
import { UserService } from '@services/UserService';

const verification =
    (
        req: Request,
        res: Response,
        resolve: any,
        reject: any,
        next: NextFunction
    ) =>
    async (err: any, user: UserPayload, info: any) => {
        try {
            if (err) {
                return next(err);
            }
            if (info || !user) {
                return reject(
                    new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate')
                );
            }

            const userService = new UserService();
            const userInfo = await userService.getUserByWhere({
                username: user.username,
            });

            if (!userInfo) {
                return reject(
                    new ApiError(httpStatus.NOT_FOUND, 'User not found')
                );
            }

            req.headers['x-role'] = userInfo?.role?.toString() || '0';
            req.headers['x-user-id'] = userInfo?.id;
            req.headers['x-username'] = userInfo?.username;
            req.headers['x-name'] = userInfo?.name;

            resolve();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            const err = new ApiError(
                httpStatus.UNAUTHORIZED,
                'Authentication failed'
            );
            next(err);
        }
    };

export const authentication =
    () => async (req: Request, res: Response, next: NextFunction) => {
        new Promise((resolve, reject) => {
            passport.authenticate(
                'jwt',
                { session: false },
                verification(req, res, resolve, reject, next)
            )(req, res, next);
        })
            .then(() => next())
            .catch((err) => {
                next(err);
            });
    };
