import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { User } from './users.schema';
export type orderDocument = Order & Document;

@Schema()
export class Order {
    @Prop()
    name: string;

    @Prop()
    phone: string;

    @Prop()
    gender: string;

    @Prop()
    products: string[];

    @Prop()
    adress: string;

    @Prop()
    zip: string;

    @Prop()
    email: string;

    @Prop()
    timestamp: string;

    @Prop()
    paymentToken: string;
}

export const orderSchema = SchemaFactory.createForClass(Order);

