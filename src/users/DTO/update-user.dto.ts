import { UserRole } from "src/helpers/roles/user.role"

export class UpdateUserDTO {
    readonly name: string
    readonly email: string
    readonly age: number
    readonly phone: string
    readonly role: UserRole
    readonly password: string
    readonly verified: boolean
    readonly token: string
}