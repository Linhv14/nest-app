import { 
    Injectable, 
    ForbiddenException, 
    NotFoundException,
    BadRequestException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model, ObjectId } from "mongoose";

Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) { }

    async create(user: User): Promise<User> {
        try {
            const newUser = await this.userModel.create(user)
            newUser.password = undefined
            return newUser
        } catch (error) {
            if (error.code == 11000)
            {
                throw new ForbiddenException("Email already exists")
            }
            throw new BadRequestException(error.message) 
        }
    }

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find()
        return users.map(user => {
            user.password = undefined
            return user
        })
    }

    async findById(id: string): Promise<User> {
        const user = await this.userModel.findById(id)

        if (!user) {
            throw new NotFoundException('User not found')
        }
        
        user.password = undefined
        return user
    }

    async findUnique(query: {}) {
        try {
            return await this.userModel.findOne(query)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async updateById(id: string, user: User): Promise<User> {
        try {
            const newUser = await this.userModel.findByIdAndUpdate(id, user, {
                new: true,
                runValidators: true,
            })

            newUser.password = undefined
            return newUser
        } catch (error) {
            throw new BadRequestException("Cannot find user")
        }
      }

    async deleteById(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id)
    }
}