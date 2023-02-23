import { 
    IsEmail, 
    IsNotEmpty, 
    IsNumber, 
    IsNumberString, 
    IsOptional, 
    IsString} from "class-validator"
import { UserRole } from "src/helpers/roles/user.role"
import { Exclude, Expose } from 'class-transformer';

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string
    
    @IsEmail()
    @IsOptional()
    readonly email: string
    
    @IsNotEmpty()
    @IsNumber()
    readonly age: number
    
    @IsOptional()
    @IsNumberString()
    readonly phone: string
    
    @IsNotEmpty()
    readonly role: UserRole

    @Exclude()
    @IsOptional()
    @IsString()
    readonly password: string

    @IsOptional()
    readonly verified: boolean

    @IsOptional()
    readonly token: string

    @IsOptional()
    readonly disable: boolean
}

export class UpdateUserDTO {
    readonly name: string
    @IsOptional()
    readonly email: string

    @IsNotEmpty()
    @IsNumber()
    readonly age: number

    @IsNotEmpty()
    @IsNumberString()
    readonly phone: string

    @IsOptional()
    readonly role: UserRole

    @IsOptional()
    readonly password: string

    @IsOptional()
    readonly verified: boolean

    @IsOptional()
    readonly token: string

    @IsOptional()
    readonly disable: boolean
}