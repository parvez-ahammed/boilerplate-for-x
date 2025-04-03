import { PaginationQueryDto } from '@dtos/PaginationQuery.dto';
import { UserResponseDto } from '@dtos/UserResponse.dto';
import ApiError from '@helpers/ApiError';
import { User } from '@interfaces/IUser';
import { UserRepository } from '@repositories/UserRepository';
import { UserDtoConversionUtlity } from '@utility/UserDtoConversionUtility';
import { handleRepositoryCall } from '@utility/handleRepositoryCall';
import httpStatus from 'http-status';
import { db } from 'knexfile';
import IUserService from '../interfaces/IUserService';
import { AuthService } from './AuthService';

export class UserService implements IUserService {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(
        newUser: User,
        password: string
    ): Promise<UserResponseDto> {
        const emailExists = await this.userRepository.exists({
            email: newUser.email,
        });

        const usernameExists = await this.userRepository.exists({
            username: newUser.username,
        });

        if (usernameExists || emailExists) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Username or email already exists'
            );
        }

        const user = await handleRepositoryCall(
            this.userRepository.createUser(newUser),
            httpStatus.INTERNAL_SERVER_ERROR,
            'An error occurred while creating the user'
        );
        const authService = new AuthService();
        await authService.saveUserCredentials(user.id, password);
        return UserDtoConversionUtlity.convertUser(user);
    }

    async getAllUsers(
        paginationOptions: PaginationQueryDto
    ): Promise<UserResponseDto[]> {
        const users = await handleRepositoryCall(
            this.userRepository.getAllUsers(paginationOptions),
            httpStatus.INTERNAL_SERVER_ERROR,
            'An error occurred while fetching all users'
        );
        return UserDtoConversionUtlity.convertUsers(users);
    }

    async getUserById(id: string): Promise<UserResponseDto> {
        const user = await handleRepositoryCall(
            this.userRepository.getUserById(id),
            httpStatus.INTERNAL_SERVER_ERROR,
            'An error occurred while fetching the user'
        );
        return UserDtoConversionUtlity.convertUser(user);
    }

    async getUserByUsername(username: string): Promise<UserResponseDto> {
        const user = await handleRepositoryCall(
            this.userRepository.getUserByWhere({ username }),
            httpStatus.INTERNAL_SERVER_ERROR,
            'An error occurred while fetching the user'
        );
        return UserDtoConversionUtlity.convertUser(user);
    }

    async getUserByWhere(condition: object): Promise<UserResponseDto> {
        const user = await handleRepositoryCall(
            this.userRepository.getUserByWhere(condition),
            httpStatus.INTERNAL_SERVER_ERROR,
            'An error occurred while fetching the user'
        );
        return UserDtoConversionUtlity.convertUser(user);
    }

    async updateUser(
        id: string,
        updatedUserInfo: User
    ): Promise<UserResponseDto> {
        if (updatedUserInfo.name || updatedUserInfo.username) {
            const updateData: Record<string, string> = {};

            if (updatedUserInfo.name) {
                updateData.authorName = updatedUserInfo.name;
            }
            if (updatedUserInfo.username) {
                updateData.authorUsername = updatedUserInfo.username;
            }
        }
        const updatedUser = await handleRepositoryCall(
            this.userRepository.updateUserWhere({ id }, updatedUserInfo),
            httpStatus.INTERNAL_SERVER_ERROR,
            'An error occurred while updating the user'
        );
        return UserDtoConversionUtlity.convertUser(updatedUser);
    }

    async deleteUser(id: string): Promise<UserResponseDto> {
        let deletedUser;

        await db.transaction(async (trx) => {
            deletedUser = await handleRepositoryCall(
                this.userRepository.deleteUserByWhere({ id }, trx),
                httpStatus.INTERNAL_SERVER_ERROR,
                'An error occurred while deleting the user'
            );

            const authService = new AuthService();
            await authService.deleteUserCredentials(id, trx);
        });

        return UserDtoConversionUtlity.convertUser(deletedUser);
    }
}
