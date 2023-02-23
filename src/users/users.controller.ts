import {
    Controller,
    Body, Param,
    Get, Post, Put, Delete,
    Req,
    UseGuards
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "../schemas/user.schema";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDTO, UpdateUserDTO } from "./DTO/user.dto";
import { Request } from "express"

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    // @Post()
    // create(@Body() user: CreateUserDTO): Promise<User> {
    //     return this.usersService.create(user)
    // }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Req() request: Request): User {
        return request['user']
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findById(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    update(@Param('id') id: string, @Body() user: UpdateUserDTO,
    ): Promise<User> {
        return this.usersService.updateById(id, user)
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<User> {
        return this.usersService.deleteById(id)
    }


}