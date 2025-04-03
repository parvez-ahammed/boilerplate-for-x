export default interface IAuthService {
    saveUserCredentials(userId: string, password: string): Promise<void>;
}
