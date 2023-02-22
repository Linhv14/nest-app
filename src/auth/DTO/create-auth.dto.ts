import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
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
    readonly password: string

    @IsOptional()
    readonly verified: boolean
}