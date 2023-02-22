import {
    Controller,
    Body, Param,
    Get, Post, Put, Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "../schemas/user.schema";
import { CreateUserDTO } from "./DTO/create-user.dto";
import { UpdateUserDTO } from "./DTO/update-user.dto";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() user: CreateUserDTO): Promise<User> {
        return this.usersService.create(user)
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findById(id)
    }

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