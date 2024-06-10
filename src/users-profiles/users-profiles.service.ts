import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersProfileDto } from './dto/create-users-profile.dto';
import { UpdateUsersProfileDto } from './dto/update-users-profile.dto';
import { UserProfile } from './schemas/user-profile.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserProfileAlreadyExistsException } from 'src/common/exceptions/user-profile-already-exist';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class UsersProfilesService {
  constructor(@InjectModel(UserProfile.name) private readonly userProfileModel: Model<UserProfile>, @InjectModel(User.name) private readonly userModel: Model<User>){};
  async create(createUsersProfileDto: CreateUsersProfileDto) {
    const existingUserProfile = await this.userProfileModel.findOne({user: createUsersProfileDto.userId}).exec();

    const userExists =  await this.userModel.findById(createUsersProfileDto.userId).exec();

    if(!userExists) throw new HttpException('Error del servicio', HttpStatus.BAD_REQUEST);
    if(existingUserProfile) throw new UserProfileAlreadyExistsException();
    

    const newUserProfile = new this.userProfileModel(createUsersProfileDto);
    return newUserProfile.save();
  }

  findAll() {
    return this.userProfileModel.find().exec();
  }

  async findOne(id: string) {
    const user =  await this.userProfileModel.findById(id).select('-password').exec();
    return user ? user.toObject(): null;
  }

  async update(id: string, updateUsersProfileDto: UpdateUsersProfileDto): Promise<Omit<UserProfile, 'password'> | null> {
    const updatedUser = await this.userProfileModel.findByIdAndUpdate(id, updateUsersProfileDto, { new: true }).select('-password').exec(); 
    return updatedUser ? updatedUser.toObject() : null;
  }

  async remove(id: string): Promise<void> {
    await this.userProfileModel.findByIdAndDelete(id).exec();
  }
}
