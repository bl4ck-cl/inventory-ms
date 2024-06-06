import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly _usersService: UsersService, private readonly _jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user: User = await this._usersService.findByNameOrEmail(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user.toObject();
            return result;
        };
        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, password: user.password };
        return {
            access_token: this._jwtService.sign(payload),
        }
    }
}
