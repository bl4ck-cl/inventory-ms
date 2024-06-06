import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

@Schema()
export class UserProfile extends Document {
    @Prop({ required: false})
    readonly name?: string;
    @Prop({ required: false })
    readonly lastname?: string;
    @Prop({ type: Date, required: false })
    readonly birthdate?: Date;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
