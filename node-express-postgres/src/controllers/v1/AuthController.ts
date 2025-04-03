import logger from '@helpers/Logger';
import { AuthService } from '@services/AuthService';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export default class UserController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }
    loginWithEmailPassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { email, password } = req.body;
            const response = await this.authService.loginWithEmailPassword(
                email,
                password
            );

            res.status(httpStatus.OK).send({
                token: response.token,
                user: response.user,
            });
        } catch (error) {
            logger.error(error);
            next(error);
        }
    };
}
