import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserProfile } from 'src/users-profiles/schemas/user-profile.schema';

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    readonly username: string;
    @Prop({ required: true, unique: true})
    readonly email: string;
    @Prop({ required: true })
    readonly password: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' })
    readonly userProfile?: UserProfile;
}

export const UserSchema = SchemaFactory.createForClass(User);
