import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRole } from "src/helpers/roles/user.role";
import { Exclude, Expose } from 'class-transformer';
@Schema({
    timestamps: true
})
export class User {

    @Prop()
    name: string
    
    @Prop({unique: true})
    email: string

    @Prop()
    age: number

    @Prop({default: "customer"})
    role: UserRole

    @Prop()
    phone: string

    @Exclude()
    @Prop()
    password: string

    @Prop({default: false})
    verified: boolean

    @Prop()
    token: string

    @Prop({default: false})
    disable: boolean

}

export const UserSchema = SchemaFactory.createForClass(User)