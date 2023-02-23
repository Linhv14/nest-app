import { Post, Body, Controller, UseGuards, Put, Param, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDTO, AuthenticateDTO } from './DTO/auth.dto';
import { User } from '../schemas/user.schema';
import { IChangePassword } from 'src/helpers/interfaces/password.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: AuthService) { }

    @Post('register')
    create(@Body() user: CreateAuthDTO) {
        return this.usersService.register(user)
    }

    @Post('login')
    login(@Body() user: AuthenticateDTO) {
        return this.usersService.login(user)
    }

    
    // @UseGuards(AuthGuard('jwt'))
    @Put('change-password/:id') 
    changePassword(@Param('id') id: string, @Body() data: IChangePassword) {
        return this.usersService.changePassword(id, data)
    }
}
