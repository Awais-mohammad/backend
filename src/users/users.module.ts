import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]

})

export class UsersModule { }
