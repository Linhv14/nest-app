import {
    Controller,
    Body, Param,
    Get, Post, Put, Delete,
    Req,
    UseGuards,
    Patch
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "../schemas/user.schema";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDTO, UpdateUserDTO } from "./DTO/user.dto";
import { Request } from "express"
import { RolesGuard } from "../helpers/guards/roles.guard";
import { Roles } from "../helpers/decorators/role.decorator";
import { UserValidationPipe } from "../helpers/pipes/validation.pipe";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin', 'staff')
    @Post()
    create(@Body() user: CreateUserDTO): Promise<User> {
        return this.usersService.create(user)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin', 'staff')
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Req() request: Request): User {
        return request['user']
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin', 'staff')
    @Get('blocked')
    findBlockUsers(): Promise<User[]> {
        const filter = { status: false }
        return this.usersService.findFilter(filter)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin', 'staff')
    @Get('customers')
    getCustomers(): Promise<User[]> {
        const filter = { role: 'customer' }
        return this.usersService.findFilter(filter)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get('staffs')
    getStaffs(): Promise<User[]> {
        const filter = { role: 'staff' }
        return this.usersService.findFilter(filter)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get('admins')
    getAdmin(): Promise<User[]> {
        const filter = { role: 'admin' }
        return this.usersService.findFilter(filter)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get('recent/:dayAgo')
    getRecentUsers(@Param('dayAgo') dayAgo: number) {
        return this.usersService.getRecentUsers(dayAgo)
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findById(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    update(@Param('id') id: string, @Body(UserValidationPipe) user: UpdateUserDTO,
    ): Promise<User> {
        return this.usersService.updateById(id, user)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Delete(':id')
    delete(@Param('id') id: string): Promise<User> {
        return this.usersService.deleteById(id)
    }

}