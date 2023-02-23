import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { IPayload } from "src/helpers/interfaces/payload.interface";
import { User } from "src/schemas/user.schema";
import { Model } from "mongoose";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(@InjectModel(User.name)
    private readonly userModel: Model<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY
        })
    }

    async validate(payload: IPayload): Promise<User> {
        const user = await this.userModel.findById(payload.sub)
        user.password = undefined
        return user
    }
    
}
