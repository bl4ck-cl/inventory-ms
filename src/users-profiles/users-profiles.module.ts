import { Module } from '@nestjs/common';
import { UsersProfilesService } from './users-profiles.service';
import { UsersProfilesController } from './users-profiles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfile, UserProfileSchema } from './schemas/user-profile.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserProfile.name, schema: UserProfileSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersProfilesController],
  providers: [UsersProfilesService],
})
export class UsersProfilesModule {}
