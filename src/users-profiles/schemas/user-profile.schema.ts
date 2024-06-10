import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema()
export class UserProfile extends Document {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    readonly user: User;
    @Prop({ required: false})
    readonly name?: string;
    @Prop({ required: false })
    readonly lastname?: string;
    @Prop({ type: Date, required: false })
    readonly birthdate?: Date;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
