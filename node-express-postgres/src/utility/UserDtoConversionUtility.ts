import { UserResponseDto } from '@dtos/UserResponse.dto';
import { User } from '@interfaces/IUser';

export class UserDtoConversionUtlity {
    static convertUser(user: User): UserResponseDto | null {
        if (!user) {
            return null;
        }
        return {
            id: user.id,
            username: user.username,
            name: user.name,
            joinDate: user.joinDate,
            role: user.role,
            email: user.email,
            bio: user.bio,
            location: user.location,
        };
    }

    static convertUsers(users: User[]): UserResponseDto[] {
        const userResponseDtos: UserResponseDto[] = [];
        for (const user of users) {
            userResponseDtos.push(this.convertUser(user));
        }
        return userResponseDtos;
    }
}
