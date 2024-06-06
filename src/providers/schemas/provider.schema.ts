import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Provider extends Document {
    @Prop({ required: true, unique: true })
    readonly name: string;
    @Prop({ required: true, unique: true})
    readonly type: string;
    @Prop({ required: true })
    readonly password: string;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
