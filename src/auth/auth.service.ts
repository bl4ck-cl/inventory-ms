import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private readonly _usersService: UsersService, private readonly _jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this._usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, password: user.password };
        return {
            access_token: this._jwtService.sign(payload),
        }
    }
}
