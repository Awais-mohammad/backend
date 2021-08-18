import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';



@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/brixton'),
    AuthModule,
  
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule { }
