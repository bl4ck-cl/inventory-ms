import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/products/schema/product.schema';

export enum ProviderType {
    WHOLESALE = 0,
    RETAILER = 1, 
};

@Schema()
export class Provider extends Document {
    @Prop({ required: true, unique: true })
    readonly name: string;
    @Prop({ required: true, unique: true, enum: ProviderType})
    readonly type: ProviderType;
    @Prop({ required: false, type: [Types.ObjectId], ref: Product.name })
    readonly products?: Product[];
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
