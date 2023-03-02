import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import mongoose from 'mongoose';
import * as argon from 'argon2';
import { IAccressToken, IPayload } from 'src/helpers/interfaces/payload.interface';
import { getPayload, verifyPassword } from 'src/helpers/helper';
import { ChangePasswordDTO, LoginDTO, UpdateSecretFieldUserDTO } from './DTO/auth.dto';

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
                throw new ForbiddenException('Email already exists')
            } else {
                throw new Error(error.message)
            }
        }
    }

    async login(input: LoginDTO): Promise<IAccressToken> {
        const user = await this.userModel.findOne({ email: input.email })

        if (!user) {
            throw new UnauthorizedException('Wrong credentials')
        }

        // Check account banned or not
        if (!user.status) {
            throw new ForbiddenException('Your account has locked')
        }

        if (! await verifyPassword(user.password, input.password)) {
            throw new UnauthorizedException('Wrong credentials')
        }

        const payload = getPayload(user._id, user)

        return await this.signJwtToken(payload)
    }

    async changePassword(id: string, input: ChangePasswordDTO): Promise<any> {

        const user = await this.userModel.findById(id)

        const isMatchedOldPassowrd = await argon.verify(user.password, input.currentPassword)
        if (!isMatchedOldPassowrd) {
            throw new UnauthorizedException('Incorrect old password')
        }

        const isMatchedOldAndNewPassowrd = await argon.verify(user.password, input.newPassword)

        if (isMatchedOldAndNewPassowrd) {
            throw new BadRequestException('New password cannot be the same as your old password')
        }

        const newHashedPassword = await argon.hash(input.newPassword)

        user.password = newHashedPassword
        await user.save()

        const payload = getPayload(user._id, user)
        return await this.signJwtToken(payload)

    }
    
    async updateById(id: string, updateData: UpdateSecretFieldUserDTO): Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(id, updateData, { new: true })
        user.password = undefined
        return user
    }

    async signJwtToken(payload: IPayload): Promise<IAccressToken> {

        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: process.env.JWT_EXPIRES_IN,
            secret: process.env.JWT_SECRET_KEY
        })
        return { accessToken }
    }
}
