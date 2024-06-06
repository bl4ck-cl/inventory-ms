import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Aggregate, Model } from 'mongoose';
import { UserAlreadyExistsException } from 'src/common/exceptions/user-already-exist';
import * as bcrypt from 'bcrypt';
import { UserProfile } from 'src/users-profiles/schemas/user-profile.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(UserProfile.name) private readonly userProfileModel: Model<UserProfile>) { }

    async findByUsername(username: string): Promise<any> {
        return await this.userModel.findOne({ username }).select('-password').exec();
    }

    async create(createUserDto: CreateUserDto) {
        const isUserCreated = await this.userModel.findOne({ $or: [{ username: createUserDto.username }, { email: createUserDto.email }] });

        if (isUserCreated) throw new UserAlreadyExistsException

        const { password, userProfile, ...user } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        if (userProfile) {
            const newUserProfile = new this.userProfileModel(userProfile);
            const savedNewUserProfile = await newUserProfile.save();
            const newUser = new this.userModel({ ...user, password: hashedPassword, userProfile: savedNewUserProfile })
            return newUser.save();
        }
        const newUser = new this.userModel({ ...user, password: hashedPassword });
        return newUser.save();
    }

    async findAll(): Promise<Omit<User, 'password'>[]> {
        return await this.userModel.find().select('-password').exec();
    }

    async findOne(id: string): Promise<User | null> {
        const user = await this.userModel.findById(id).populate('userProfile').select('-password').exec();
        return user ? user.toObject(): null;
    }

    async findByEmail(email: string): Promise<Omit<User, 'password'> | null> {
        return await this.userModel.findOne({ email }).select('-password').exec();
    }

    async findByNameOrEmail(input: string): Promise<User | null> {
        return await this.userModel.findOne({ $or: [{ username: input }, { email: input }] }).exec();
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const { password, ...userData } = updateUserDto;

        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        const updatedUser = await this.userModel.findByIdAndUpdate(
            id, {
            ...userData,
            ...(hashedPassword && { password: hashedPassword })
        },
            { new: true }).select('-password').exec();

        return updatedUser ? updatedUser.toObject() : null;
    }

    async remove(id: string) {
        return await this.userModel.findByIdAndDelete(id).exec();
    }
}
