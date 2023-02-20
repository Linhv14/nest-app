import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRole } from "src/helpers/roles/user.role";

@Schema({
    timestamps: true
})
export class User {

    @Prop({required: true})
    name: string
    
    @Prop({required: true, unique: true})
    email: string

    @Prop({required: true})
    age: number

    @Prop({required: true, default: "customer"})
    role: UserRole

    @Prop({required: false})
    phone: string

    @Prop({required: true})
    password: string

    @Prop({required: false, default: false})
    verified: boolean

}

export const UserSchema = SchemaFactory.createForClass(User)