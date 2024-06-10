import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ProductType {
    ELECTRONIC = 0,
    CLOTHES = 1, 
    FOOD = 2
};

@Schema()
export class Product extends Document {
    @Prop({ required: true, unique: true })
    readonly sku: string;
    @Prop({ required: true, unique: false })
    readonly name: string;
    @Prop({ required: true, unique: false, enum: ProductType})
    readonly type: ProductType;
    
}
export const ProductSchema = SchemaFactory.createForClass(Product);
