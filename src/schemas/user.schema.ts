import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRole } from "src/helpers/roles/user.role";

@Schema({
    timestamps: true
})
export class User {

    @Prop()
    name: string

    @Prop()
    avatar: string

    @Prop({unique: true})
    email: string

    @Prop()
    age: number

    @Prop({default: "customer"})
    role: UserRole

    @Prop()
    phone: string

    @Prop()
    password: string

    @Prop({default: false})
    verified: boolean

    @Prop({default: true})
    status: boolean

}

export const UserSchema = SchemaFactory.createForClass(User)