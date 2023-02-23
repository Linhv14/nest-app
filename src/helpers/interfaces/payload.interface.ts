import { UserRole } from "../roles/user.role";

export interface IPayload {
    sub: string,
    email: string,
    role: UserRole
}

export interface IAccressToken {
    accessToken: string
}