export interface AuthenticatedUser {
    email: string,
    token: string,
    fullname: string,
    role: UserRole,

}

export enum UserRole{
    ADMINISTRATOR = 'ADMINISTRATOR',
    USER = 'USER',
}