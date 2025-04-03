import { AuthResponseDto } from '@dtos/AuthResponse.dto';
import { Auth } from '@interfaces/IAuth';

export class AuthDtoConversionUtlity {
    static convertAuth(auth: Auth): AuthResponseDto {
        if (!auth) {
            return null;
        }
        return {
            id: auth.id,
            user_id: auth.user_id,
        };
    }
}
