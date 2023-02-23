import { IsEmail, IsNotEmpty, IsOptional, IsString, isNotEmpty } from "class-validator";
import { UserRole } from "src/helpers/roles/user.role";

export class CreateAuthDTO {
    @IsOptional()
    readonly name: string
    
    @IsEmail()
    @IsNotEmpty()
    readonly email: string

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
    readonly token: string

    @IsOptional()
    readonly disable: boolean
}

export class UpdateAuthDTO {
    readonly email: string
    readonly password: string
    readonly token: string
}

export class AuthenticateDTO {
    @IsOptional()
    readonly name: string
    
    @IsEmail()
    @IsNotEmpty()
    readonly email: string

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
    readonly token: string

    @IsOptional()
    readonly disable: boolean
}