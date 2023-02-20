import { 
    Injectable, 
    ForbiddenException, 
    NotFoundException,
    BadRequestException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import mongoose from "mongoose";
import * as argon from "argon2";

Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: mongoose.Model<User>
    ) { }

    async create(user: User): Promise<any> {

        user.password = await argon.hash(user.password)

        try {
            const newUser = await this.userModel.create(user)
            delete newUser.password
            return newUser
        } catch (error) {
            if (error.code == 11000) {
                throw new ForbiddenException("Email already exists")
            }  else {
                throw new Error(error.message)
            }
        }
    }

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find()
        return users
    }

    async findById(id: string): Promise<User> {
        const user = await this.userModel.findById(id)

        if (!user) {
            throw new NotFoundException('User not found')
        }
        delete user.password
        return user
    }

    async updateById(id: string, user: User): Promise<User> {
        try {
            const newUser = await this.userModel.findByIdAndUpdate(id, user, {
                new: true,
                runValidators: true,
              })

            delete newUser.password
            return newUser
        } catch (error) {
            throw new BadRequestException("Cannot find user")
        }
      }

    async deleteById(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id)
    }
}