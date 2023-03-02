import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


// <reference="https://www.youtube.com/watch?v=JbVSVJvmIPA&list=PLnmjZqzTa4veAd175E6eYG0RosdI-0qZG&index=9&t=1165s&ab_channel=NewNet">

@Schema({
   timestamps: true 
})
export class Media {
    
    @Prop()
    name: string

    @Prop()
    fileName: string

    @Prop()
    mine_type: string

    @Prop()
    size: Number

    @Prop()
    key: string

}

export const MediaSchema = SchemaFactory.createForClass(Media)

