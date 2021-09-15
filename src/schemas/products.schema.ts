import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { User } from './users.schema';
export type prodDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    name: string;

    @Prop()
    bannerImageURL: string;

    @Prop()
    prodImageURLS: string[];

    @Prop()
    category: string;

    @Prop()
    quantity: number;

    @Prop()
    price: number;


    @Prop()
    color: string[];

    @Prop()
    timestamp: string;

    @Prop()
    description: string;
}

export const ProdSchema = SchemaFactory.createForClass(Product);

