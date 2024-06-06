import { Injectable } from '@nestjs/common';
import { CreateUsersProfileDto } from './dto/create-users-profile.dto';
import { UpdateUsersProfileDto } from './dto/update-users-profile.dto';
import { UserProfile } from './schemas/user-profile.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersProfilesService {
  constructor(@InjectModel(UserProfile.name) private readonly userProfileModel: Model<UserProfile>){};
  create(createUsersProfileDto: CreateUsersProfileDto) {
    return 'This action adds a new usersProfile';
  }

  findAll() {
    return this.userProfileModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} usersProfile`;
  }

  async update(id: number, updateUsersProfileDto: UpdateUsersProfileDto) {
    return await this.userProfileModel.findByIdAndUpdate(id, updateUsersProfileDto);
  }

  remove(id: number) {
    return `This action removes a #${id} usersProfile`;
  }
}
