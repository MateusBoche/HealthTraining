import { UserRole } from "./user-role.model"


export interface User {
    id?: number,
    // id?: number,
    fullName: string,
    email: string,
    password?: string
    role: UserRole
}
