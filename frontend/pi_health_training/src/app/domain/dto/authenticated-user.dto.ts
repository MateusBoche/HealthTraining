import { UserRole } from "../model/user-role.model";

export interface AuthenticatedUser {
    id: number
    email: string,
    token: string,
    fullName: string,
    role: UserRole,

}
