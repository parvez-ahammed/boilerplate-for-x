import { UserRepository } from '../src/repositories/UserRepository';
import { AuthService } from '../src/services/implementations/AuthService';
import { UserService } from '../src/services/implementations/UserService';
import { UserDtoConversionUtlity } from '../src/utility/UserDtoConversionUtility';

jest.mock('../src/repositories/UserRepository');
jest.mock('../src/services/implementations/AuthService');
jest.mock('../src/utility/UserDtoConversionUtility');
const userData = {
    id: 'userId',
    email: 'email@example.com',
    name: 'Test User',
};

describe('UserService - createUser', () => {
    let userService: UserService;
    let createUserMock: jest.Mock;
    let saveUserCredentialsMock: jest.Mock;

    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
        userService = new UserService();

        createUserMock = jest
            .spyOn(UserRepository.prototype, 'createUser')
            .mockResolvedValue({}) as jest.Mock;

        (
            AuthService.prototype.saveUserCredentials as jest.Mock
        ).mockResolvedValue(undefined);

        saveUserCredentialsMock = jest
            .spyOn(AuthService.prototype, 'saveUserCredentials')
            .mockResolvedValue(undefined) as jest.Mock;

        (UserDtoConversionUtlity.convertUser as jest.Mock).mockReturnValue({
            id: 'userId',
            username: 'user@example.com',
            name: 'Test User',
            joinDate: new Date(),
            role: 0,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should create user successfully', async () => {
        const password = 'password';

        createUserMock.mockResolvedValue(userData);
        saveUserCredentialsMock.mockResolvedValue(undefined);

        const result = await userService.createUser(userData, password);

        expect(createUserMock).toHaveBeenCalledWith(userData);
        expect(saveUserCredentialsMock).toHaveBeenCalledWith(
            userData.id,
            password
        );
        expect(result).toEqual(UserDtoConversionUtlity.convertUser(userData));
    });

    it('should throw an error when user creation fails', () => {
        createUserMock.mockRejectedValue(new Error('Database error'));

        expect(userService.createUser(userData, 'password')).rejects.toThrow(
            'Database error'
        );
    });

    it('should throw error if user already exists', () => {
        createUserMock.mockRejectedValue(new Error('User already exists'));

        expect(userService.createUser(userData, 'password')).rejects.toThrow(
            'User already exists'
        );
    });
});
