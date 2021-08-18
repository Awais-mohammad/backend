
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    user: any;

    async validateUser(LoginUserDto): Promise<any> {
        const user = await this.usersService.findOne(LoginUserDto.email.toLowerCase());
        console.log('user is', user);

        this.user = user.toString()




        if (this.user.includes('donnot')) {
            console.log('fucked ... user nhi milaa!!');
            return 'passwords donnot match!!'
        }
        else if (!this.user.includes('user donnot exists')) {


            const saltOrRounds = 10;
            const hash = await bcrypt.hash(LoginUserDto.password, saltOrRounds);

            const isMatch = await bcrypt.compare(user.password.toString(), hash.toString());

            console.log(isMatch);

            if (isMatch) {
                console.log('tada we got user');
                const payload = { username: user.username, sub: user.userId };

                const token = this.jwtService.sign(payload)
                return token;
            } else {
                return 'ahh fuckkkk passwords dont match';

            }

        }



    }



}