import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    readonly username: string;
    @Prop({ required: true, unique: true})
    readonly email: string;
    @Prop({ required: true })
    readonly password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
