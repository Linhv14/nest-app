import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import mongoose from 'mongoose';
import * as argon from 'argon2';
import { IAccressToken, IPayload } from 'src/helpers/interfaces/payload.interface';
import { getPayload, verifyPassword } from 'src/helpers/helper';
import { IChangePassword } from 'src/helpers/interfaces/password.interface';
import { stringify } from 'querystring';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: mongoose.Model<User>,
        private readonly jwtService: JwtService
    ) { }

    async register(user: User): Promise<IAccressToken> {
        // Hash password
        user.password = await argon.hash(user.password)
        try {
            const newUser = await this.userModel.create(user)

            const payload = getPayload(newUser._id, newUser)

            return await this.signJwtToken(payload)

        } catch (error) {
            if (error.code == 11000) {
                throw new ForbiddenException("Email already exists")
            } else {
                throw new Error(error.message)
            }
        }
    }

    async login(user: User): Promise<IAccressToken> {
        const queryUser = await this.userModel.findOne({ email: user.email })

        if (!queryUser && !verifyPassword(queryUser.password, user.password)) {
            throw new UnauthorizedException("Wrong credentials")
        }

        const payload = getPayload(queryUser._id, queryUser)

        return await this.signJwtToken(payload)
    }

    async changePassword(id: string, data: IChangePassword): Promise<any> {

        const user = await this.userModel.findById(id)
        console.log(user.password);
        const isMatched = await argon.verify(data.currentPassword, user.password)
        if (!isMatched) {
            throw new UnauthorizedException("Incorrect password")
        }
        console.log(isMatched);

        // try {
        //     const newHashedPassword = await argon.hash(data.newPassword)
        //     // user.password = await argon.hash(user.password)
        //     console.log("newHashedPassword");
        //     await this.userModel.updateOne({ _id: id }, { password: newHashedPassword })
        //     // const newUser = await this.userModel.findByIdAndUpdate(id, user, {
        //     //     new: true,
        //     //     runValidators: true,
        //     // }) 

        //     const payload = getPayload(user._id, user)
        //     return await this.signJwtToken(payload)
        // } catch (error) {
        //     throw new BadRequestException(error.message)
        // }


    }

    async signJwtToken(payload: IPayload): Promise<IAccressToken> {

        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: process.env.JWT_EXPRISE_IN,
            secret: process.env.JWT_SECRET_KEY
        })
        return {
            accessToken: jwtString
        }
    }
}
