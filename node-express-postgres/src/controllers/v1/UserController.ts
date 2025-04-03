import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { UserService } from '@services/UserService';
import { User } from '@interfaces/IUser';
import { UserResponseDto } from '@dtos/UserResponse.dto';
import logger from '@helpers/Logger';
import { paginationQuerySchema } from 'src/schemas/PaginationQuerySchemas';
import { PaginationQueryDto } from '@dtos/PaginationQuery.dto';

export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }
    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { password, ...newUser } = req.body;
            const response: UserResponseDto = await this.userService.createUser(
                newUser,
                password
            );

            res.status(httpStatus.CREATED).send(response);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    };

    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pagintationQueryOptions: PaginationQueryDto =
                paginationQuerySchema.parse(req.query);
            const response: UserResponseDto[] =
                await this.userService.getAllUsers(pagintationQueryOptions);

            res.status(httpStatus.OK).send(response);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    };

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const response: UserResponseDto =
                await this.userService.getUserById(id);

            res.status(httpStatus.OK).send(response);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    };

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const updatedUserInfo: User = req.body;
            const response: UserResponseDto = await this.userService.updateUser(
                id,
                updatedUserInfo
            );

            res.status(httpStatus.OK).send(response);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    };

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const response: UserResponseDto =
                await this.userService.deleteUser(id);
            res.status(httpStatus.OK).send(response);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    };

    getUserByUsername = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const username = req.params.username;
            const response: UserResponseDto =
                await this.userService.getUserByUsername(username);

            res.status(httpStatus.OK).send(response);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    };
}
