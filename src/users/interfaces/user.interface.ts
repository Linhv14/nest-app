import { UserRole } from "src/helpers/Roles/user.role"

export interface IUser {
    id: string
    name: string
    age: number
    email: string
    password: string
    phone?: string
    role: UserRole
}