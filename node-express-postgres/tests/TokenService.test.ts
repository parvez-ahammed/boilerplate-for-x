import { appConfig } from '../src/configs/config';
import TokenService from '../src/services/implementations/TokenService';
import jwt from 'jsonwebtoken';
import { User } from '../src/interfaces/IUser';
import ms from 'ms';
import { ITokenPayload } from '../src/interfaces/ITokenPayload';
import ApiError from '../src/helpers/ApiError';
import httpStatus from 'http-status';

describe('TokenService - generateToken', () => {
    let tokenService: TokenService;
    let testUser: User;

    beforeEach(() => {
        tokenService = new TokenService();
        jest.resetAllMocks();
        jest.clearAllMocks();

        testUser = {
            username: 'testUser',
            name: 'Test User',
            role: 1,
        };
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should generate a valid token for a user', () => {
        const token = tokenService.generateToken(testUser);
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
    });

    it('should include username, name, and role in the payload', () => {
        const token = tokenService.generateToken(testUser);
        const decoded = jwt.decode(token) as ITokenPayload;
        const actual = decoded;
        const expected = testUser;
        expect(decoded).toBeDefined();
        expect(actual).toMatchObject(expected);
    });

    it('should use the correct expiration time from config', () => {
        const token = tokenService.generateToken(testUser);
        const decoded = jwt.decode(token) as ITokenPayload & { exp: number } & {
            iat: number;
        };
        expect(decoded).toBeDefined();

        const actual = decoded.exp;

        const issuedAt = decoded.iat;
        const durationInSec = Number(ms(appConfig.jwtExpiresIn)) / 1000;
        const expected = issuedAt + durationInSec;

        expect(actual).toBe(expected);
    });

    it('should throw an error if JWT signing fails', () => {
        jest.spyOn(jwt, 'sign').mockImplementation(() => {
            throw new ApiError(
                httpStatus.INTERNAL_SERVER_ERROR,
                'JWT Signing error'
            );
        });

        expect(() => tokenService.generateToken(testUser)).toThrow(
            new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'JWT Signing error')
        );
    });
});

describe('TokenService - verifyToken', () => {
    let tokenService: TokenService;
    let testUser: User;
    let token: string;

    beforeEach(() => {
        tokenService = new TokenService();
        jest.resetAllMocks();
        jest.clearAllMocks();

        testUser = {
            username: 'testUser',
            name: 'Test User',
            role: 1,
        };
        token = tokenService.generateToken(testUser);
        expect(token).toBeDefined();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should verify the token successfully and return the payload', async () => {
        const actual = await tokenService.verifyToken(token);
        const expected = testUser;
        expect(actual).toBeDefined();
        expect(actual).toMatchObject(expected);
    });
    it('should throw an error if token verification fails', async () => {
        const invalidToken = 'invalidToken';
        const actual = async () => tokenService.verifyToken(invalidToken);
        await expect(actual()).rejects.toThrow('jwt malformed');
    });
    it('should return the correct payload structure', async () => {
        const actual = await tokenService.verifyToken(token);
        const expected = expect.objectContaining({
            username: expect.any(String),
            name: expect.any(String),
            role: expect.any(Number),
        });
        expect(actual).toMatchObject(expected);
    });
    it('should throw an error if the token is expired', async () => {
        jest.useFakeTimers(); // Enable fake timers

        const expiredToken = jwt.sign(
            {
                username: testUser.username,
                name: testUser.name,
                role: testUser.role,
            },
            appConfig.jwtSecret,
            {
                expiresIn: '1s',
            }
        );

        jest.advanceTimersByTime(2000); // Fast-forward time

        await expect(tokenService.verifyToken(expiredToken)).rejects.toThrow(
            'jwt expired'
        );

        jest.useRealTimers(); // Restore real timers
    });
});
