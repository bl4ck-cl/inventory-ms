import { Module } from '@nestjs/common';
import { UsersProfilesService } from './users-profiles.service';
import { UsersProfilesController } from './users-profiles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfile, UserProfileSchema } from './schemas/user-profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserProfile.name, schema: UserProfileSchema }]),
  ],
  controllers: [UsersProfilesController],
  providers: [UsersProfilesService],
})
export class UsersProfilesModule {}
