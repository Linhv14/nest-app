import { UserRole } from "../roles/user.role";

export interface IPayload {
    sub: string,
    email: string,
    role: UserRole
    status: boolean
}

export interface IAccressToken {
    accessToken: string
}