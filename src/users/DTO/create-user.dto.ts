import { UserRole } from "src/helpers/Roles/user.role"

export class CreateUserDTO {
    id: string
    name: string
    age: number
    email: string
    password: string
    phone?: string
    role: UserRole
}