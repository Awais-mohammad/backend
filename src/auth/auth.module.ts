import { StripeModule } from 'nestjs-stripe';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UsersModule } from './../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';




@Module({
  imports: [

    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: 'ksfhgiorwgsjf34689s7dg65s4vg68dg45sdg',
      signOptions: { expiresIn: '60s' },
    }),


    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
