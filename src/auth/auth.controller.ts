import { Post, Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDTO } from './DTO/create-auth.dto';
import { User } from '../schemas/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: AuthService) { }

    @Post('register')
    create(@Body() user: CreateAuthDTO) {
        return this.usersService.register(user)
    }

    @Post('login')
    login(@Body() user: CreateAuthDTO) {
        return this.usersService.login(user)
    }
}
