import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { IUser } from "./interfaces/user.interface";
import { CreateUserDTO } from "./DTO/create-user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
        this.usersService = usersService
    }

    @Post()
    async create(@Body() user: CreateUserDTO) {
        this.usersService.create(user)
    }

    @Get()
    async findAll(): Promise<IUser[]> {
        return this.usersService.findAll()
    }

    @Get('id')
    async findOne(@Param('id') id: string): Promise<IUser | boolean> {
        return this.usersService.findOne(id)
    }
}