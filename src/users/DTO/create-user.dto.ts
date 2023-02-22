import { 
    IsBoolean,
    IsEmail, 
    IsNotEmpty, 
    IsNumber, 
    IsOptional, 
    IsString} from "class-validator"
import { UserRole } from "src/helpers/roles/user.role"

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
    readonly phone: string
    
    @IsNotEmpty()    
    @IsString()
    readonly role: UserRole


    @IsOptional()
    @IsString()
    readonly password: string

    @IsOptional()
    @IsBoolean()
    readonly verified: boolean

    @IsOptional()
    @IsString()
    readonly token: string
}