import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt'
export type prodDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    name: string;

    @Prop()
    lastName: string;

    @Prop()
    age: number;

    @Prop()
    email: string;

    @Prop()
    password: string = "";

    @Prop()
    quantity: number;

    @Prop()
    price: number;





}

export const ProdSchema = SchemaFactory.createForClass(Product);

