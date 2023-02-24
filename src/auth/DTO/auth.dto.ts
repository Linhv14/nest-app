import { IsEmail, IsNotEmpty, IsOptional, IsString, isNotEmpty } from "class-validator";
import { UserRole } from "src/helpers/roles/user.role";

export class RegisterDTO {
    @IsOptional()
    readonly name: string
    
    @IsEmail()
    @IsNotEmpty()
    readonly email: string

    @IsOptional()
    @IsString()
    readonly avatar: string

    @IsOptional()
    readonly age: number
    
    @IsOptional()
    readonly phone: string
    
    @IsOptional()
    readonly role: UserRole

    @IsNotEmpty()
    @IsString()
    readonly password: string

    @IsOptional()
    readonly verified: boolean

    @IsOptional()
    readonly status: boolean
}

export class LoginDTO {

    @IsEmail()
    @IsNotEmpty()
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly password: string
}

export class ChangePasswordDTO {
    @IsNotEmpty()
    readonly currentPassword: string

    @IsNotEmpty()
    readonly newPassword: string
}