import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose'
@Schema()
export class User extends Document {
   
    @Prop({ default: "", required: false })
    name: string;

    @Prop({ default: "", required: false })
    age: number;

    @Prop({ default: "", required: false })
    email: string;

    @Prop({ default: "", required: false })
    phone: string;

    @Prop({ default: "", required: false })
    password: string;

    @Prop({ default: new Date() })
    created_at: Date;

    @Prop({ default: new Date() })
    updated_at: Date;

    @Prop({ default: false })
    status: boolean;

    @Prop({default:"",required:false})
    token: string;
}

export const UserSchema = SchemaFactory.createForClass(User)