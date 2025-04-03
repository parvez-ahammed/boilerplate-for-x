import { AuthRepository } from '@repositories/AuthRepository';
import { comparePassword } from '@utility/comparePasswordUtility';
import { hashPassword } from '@utility/hashPasswordUtility';
import IAuthService from '../interfaces/IAuthService';
import TokenService from './TokenService';
import { UserService } from './UserService';
import { handleRepositoryCall } from '@utility/handleRepositoryCall';
import httpStatus from 'http-status';
import ApiError from '@helpers/ApiError';
import { Auth } from '../../interfaces/IAuth';
import { AuthDtoConversionUtlity } from '@utility/AuthDtoConversionUtility';
import { AuthResponseDto } from '@dtos/AuthResponse.dto';
import { Knex } from 'knex';

export class AuthService implements IAuthService {
    private authRepository: AuthRepository;
    private userService = new UserService();
    constructor() {
        this.authRepository = new AuthRepository();
    }

    async saveUserCredentials(userId: string, password: string): Promise<void> {
        const hashedPassword = await hashPassword(password);
        await this.authRepository.saveUserCredentials(userId, hashedPassword);
    }

    loginWithEmailPassword = async (email: string, password: string) => {
        const user = await handleRepositoryCall(
            this.userService.getUserByWhere({ email }),
            httpStatus.NOT_FOUND,
            'User not found'
        );

        const hashedPassword = await handleRepositoryCall(
            this.authRepository.getUserCredentials(user.id),
            httpStatus.NOT_FOUND,
            'User not found'
        );

        const isPasswordValid = await comparePassword(password, hashedPassword);

        if (!isPasswordValid) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Invalid Email or Password'
            );
        }

        const tokenService = new TokenService();
        const token = tokenService.generateToken(user);

        return { token, user };
    };

    async deleteUserCredentials(
        userId: string,
        trx?: Knex.Transaction
    ): Promise<AuthResponseDto> {
        const result: Auth = await handleRepositoryCall(
            this.authRepository.deleteUserCredentials(userId, trx),
            httpStatus.NOT_FOUND,
            'User ID not found'
        );

        return AuthDtoConversionUtlity.convertAuth(result);
    }
}
