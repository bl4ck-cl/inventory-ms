import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAlreadyExistsException } from 'src/common/exceptions/user-already-exist';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async findOne(id: string): Promise<any> {
        return 'one existing user';
    }

    async create(createUserDto: CreateUserDto) {

        const isUserCreated = await this.userModel.findOne({ $or: [{ username: createUserDto.username }, { email: createUserDto.email }] });

        if (isUserCreated) throw new UserAlreadyExistsException

        const { password, ...user } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = new this.userModel({ ...user, password: hashedPassword });
        return createdUser.save();
    }

    findAll() {
        return `This action returns all users`;
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: string) {
        return `This action removes a #${id} user`;
    }
}
