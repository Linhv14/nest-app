import { Post, Body, Controller, UseGuards, Param, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO, ChangePasswordDTO } from './DTO/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../helpers/guards/roles.guard';
import { User } from '../schemas/user.schema';
import { Roles } from '../helpers/decorators/role.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: AuthService) { }

    @Post('register')
    register(@Body() user: RegisterDTO) {
        return this.usersService.register(user)
    }

    @Post('login')
    login(@Body() user: LoginDTO) {
        return this.usersService.login(user)
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Patch(':id/password') 
    changePassword(@Param('id') id: string, @Body() data: ChangePasswordDTO) {
        return this.usersService.changePassword(id, data)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Patch(':id/block')
    blockUser(@Param('id') id: string): Promise<User> {
        return this.usersService.block(id)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Patch(':id/unblock')
    unBlockUser(@Param('id') id: string): Promise<User> {
        return this.usersService.unBlock(id)
    }

}
