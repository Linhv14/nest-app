import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import mongoose from 'mongoose';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: mongoose.Model<User>
    ) { }

    async register(user: User): Promise<User> {
        user.password = await argon.hash(user.password)
        try {
            const newUser = await this.userModel.create(user)

            return newUser
        } catch (error) {
            if (error.code == 11000) {
                throw new ForbiddenException("Email already exists")
            }  else {
                throw new Error(error.message)
            }
        }
    }

    async login(user: User): Promise<User> {
        const queryUser = await this.userModel.findOne({email: user.email})
        console.log(queryUser)

        if (!queryUser) {
            throw new ForbiddenException("User not found")
        }

        const isPasswordMatched = await argon.verify(queryUser.password, user.password)

        if (!isPasswordMatched) {
            throw new ForbiddenException("Incorrect password")
        }
        delete queryUser.password
        return queryUser
    }
}
