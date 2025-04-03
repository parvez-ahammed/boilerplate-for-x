import { ITokenPayload } from '@interfaces/ITokenPayload';
import { User } from '@interfaces/IUser';

export default interface ITokenService {
    generateToken(user: User): string;
    verifyToken(token: string): Promise<ITokenPayload>;
}
