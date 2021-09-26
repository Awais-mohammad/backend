import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt'
export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    age: number;

    @Prop()
    email: string;

    @Prop()
    password: string = "";

    @Prop()
    phone: number;

    @Prop()
    adress: string;

    @Prop()
    zip: string;


}

export const UserSchema = SchemaFactory.createForClass(User);

