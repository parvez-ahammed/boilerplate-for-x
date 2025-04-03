import { AuthRepository } from '../src/repositories/AuthRepository';
import { AuthService } from '../src/services/implementations/AuthService';
import { hashPassword } from '../src/utility/hashPasswordUtility';
import { UserService } from '../src/services/implementations/UserService';
import { comparePassword } from '../src/utility/comparePasswordUtility';
import TokenService from '../src/services/implementations/TokenService';

jest.mock('../src/utility/hashPasswordUtility', () => ({
    hashPassword: jest.fn(),
}));
jest.mock('../src/services/implementations/UserService');
jest.mock('../src/services/implementations/TokenService');
jest.mock('../src/repositories/AuthRepository');
jest.mock('../src/utility/comparePasswordUtility');

describe('AuthService - saveUserCredentials', () => {
    let authService: AuthService;
    let saveUserCredentialsMock: jest.Mock;

    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
        authService = new AuthService();

        saveUserCredentialsMock = jest
            .spyOn(AuthRepository.prototype, 'saveUserCredentials')
            .mockResolvedValue(undefined) as jest.Mock;

        (hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should save user credentials successfully', async () => {
        await expect(
            authService.saveUserCredentials('userId', 'password')
        ).resolves.not.toThrow();

        expect(hashPassword).toHaveBeenCalledWith('password');
        expect(saveUserCredentialsMock).toHaveBeenCalledWith(
            'userId',
            'hashedPassword'
        );
    });

    it('should throw an error if saving credentials fails', async () => {
        saveUserCredentialsMock.mockRejectedValue(new Error('Database error'));

        await expect(
            authService.saveUserCredentials('userId', 'password')
        ).rejects.toThrow('Database error');

        expect(hashPassword).toHaveBeenCalledWith('password');
        expect(saveUserCredentialsMock).toHaveBeenCalledWith(
            'userId',
            'hashedPassword'
        );
    });

    it('should hash the password before saving', async () => {
        await authService.saveUserCredentials('userId', 'password');

        expect(hashPassword).toHaveBeenCalledWith('password');
        expect(saveUserCredentialsMock).toHaveBeenCalledWith(
            'userId',
            'hashedPassword'
        );
        expect(
            (hashPassword as jest.Mock).mock.invocationCallOrder[0]
        ).toBeLessThan(saveUserCredentialsMock.mock.invocationCallOrder[0]);
    });
});

describe('AuthService - loginWithEmailPassword', () => {
    let authService: AuthService;
    let getUserByWhereMock: jest.Mock;
    let getUserCredentialsMock: jest.Mock;
    let comparePasswordMock: jest.Mock;
    let generateTokenMock: jest.Mock;

    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();

        authService = new AuthService();

        getUserByWhereMock = jest
            .spyOn(UserService.prototype, 'getUserByWhere')
            .mockResolvedValue({ id: 'userId' }) as jest.Mock;

        getUserCredentialsMock = jest
            .spyOn(AuthRepository.prototype, 'getUserCredentials')
            .mockResolvedValue('hashedPassword') as jest.Mock;

        comparePasswordMock = comparePassword as jest.Mock;
        comparePasswordMock.mockResolvedValue(true);

        generateTokenMock = jest
            .spyOn(TokenService.prototype, 'generateToken')
            .mockReturnValue('generatedToken') as jest.Mock;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return a token when login is successful', async () => {
        const result = await authService.loginWithEmailPassword(
            'email',
            'password'
        );

        expect(getUserByWhereMock).toHaveBeenCalledWith({ email: 'email' });
        expect(getUserCredentialsMock).toHaveBeenCalledWith('userId');
        expect(comparePasswordMock).toHaveBeenCalledWith(
            'password',
            'hashedPassword'
        );
        expect(generateTokenMock).toHaveBeenCalledWith({ id: 'userId' });

        expect(result).toBe('generatedToken');
    });

    it('should throw an error when user is not found', async () => {
        getUserByWhereMock.mockResolvedValue(null);

        await expect(
            authService.loginWithEmailPassword('email', 'password')
        ).rejects.toThrow('User not found');

        expect(getUserByWhereMock).toHaveBeenCalledWith({ email: 'email' });
    });

    it('should throw an error when password is incorrect', () => {
        comparePasswordMock.mockResolvedValue(false);

        expect(
            authService.loginWithEmailPassword('email', 'password')
        ).rejects.toThrow('Invalid Email or Password');
    });

    it('should throw an error if credentials retrieval fails', () => {
        getUserCredentialsMock.mockRejectedValue(new Error('Database error'));

        expect(
            authService.loginWithEmailPassword('email', 'password')
        ).rejects.toThrow('Database error');
    });

    it('should generate a valid token on successful login', async () => {
        getUserByWhereMock.mockResolvedValue({ id: 'userId' });

        getUserCredentialsMock.mockResolvedValue('hashedPassword');

        comparePasswordMock.mockResolvedValue(true);

        generateTokenMock.mockReturnValue('generatedToken');

        const result = await authService.loginWithEmailPassword(
            'email',
            'password'
        );

        expect(getUserByWhereMock).toHaveBeenCalledWith({ email: 'email' });

        expect(getUserCredentialsMock).toHaveBeenCalledWith('userId');

        expect(comparePasswordMock).toHaveBeenCalledWith(
            'password',
            'hashedPassword'
        );

        expect(generateTokenMock).toHaveBeenCalledWith({ id: 'userId' });

        expect(result).toBe('generatedToken');
    });
});
