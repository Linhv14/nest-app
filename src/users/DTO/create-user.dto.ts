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
    
    @IsNotEmpty()
    @IsEmail()
    // @IsUniqe()
    readonly email: string
    
    @IsNotEmpty()
    @IsNumber()
    readonly age: number
    
    @IsOptional()
    readonly phone: string
    
    @IsNotEmpty()    
    @IsString()
    readonly role: UserRole

    @IsNotEmpty()
    @IsString()
    readonly password: string

    @IsOptional()
    @IsBoolean()
    readonly verified: boolean
}