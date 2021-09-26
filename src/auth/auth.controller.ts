import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/loginuser.dto'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }
    @Post()
    async login(@Body() LoginUserDto: LoginUserDto) {
        // return await this.authService.validateUser(LoginUserDto);

    }
    @Get()
    async vvs() {
        return 'working fine!!'
    }


    @Post('payment')
    async pay(@Body() data: any) {



        return await this.authService.stripe(data.token, data.amount, data.description);

    }

    @Get('payment')
    test() {
        return 'all working goof';
    }
}

