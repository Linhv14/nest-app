import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/helpers/strategy/user.strategy";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        JwtModule.register({})
],
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy],
})
export class UsersModule {}