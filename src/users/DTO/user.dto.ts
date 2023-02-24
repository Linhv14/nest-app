import { 
    IsEmail, 
    IsNotEmpty, 
    IsNumber, 
    IsNumberString, 
    IsOptional, 
    IsString} from "class-validator"
import { UserRole } from "src/helpers/roles/user.role"

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsOptional()
    @IsString()
    readonly avatar: string

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

    @IsOptional()
    @IsString()
    readonly password: string

    @IsOptional()
    readonly verified: boolean

    @IsOptional()
    readonly status: boolean
}

export class UpdateUserDTO {
    @IsNotEmpty()
    readonly name: string

    @IsNotEmpty()
    @IsNumber()
    readonly age: number

    @IsNotEmpty()
    @IsNumberString()
    readonly phone: string
}