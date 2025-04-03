import { PaginationQueryDto } from '@dtos/PaginationQuery.dto';
import { UserResponseDto } from '@dtos/UserResponse.dto';
import { User } from '@interfaces/IUser';

export default interface IUserService {
    createUser(newUser: User, password: string): Promise<UserResponseDto>;
    getAllUsers(
        paginationOptions: PaginationQueryDto
    ): Promise<UserResponseDto[]>;
    getUserById(id: string): Promise<UserResponseDto>;
    updateUser(id: string, updatedUserInfo: User): Promise<UserResponseDto>;
    deleteUser(id: string): Promise<UserResponseDto>;
}
