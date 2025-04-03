export interface User {
    id?: string;
    username?: string;
    name?: string;
    email?: string;
    joinDate?: Date;
    role?: number;
    passwordLastModificationTime?: Date;
    bio?: string;
    location?: string;
}
