import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {



  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,

  ) {

  }

  async create(createUserDto: CreateUserDto): Promise<User> {

    const password = createUserDto.password;

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    createUserDto.password = hash

    const isMatch = await bcrypt.compare(password, hash);
    console.log(isMatch);

    return new this.userModel(createUserDto).save();

    //return new this.userModel(createUserDto).save()
  }

  findAll() {
    return this.userModel.find();
  }


  res: any;

  async findOne(email: string) {
    this.res = await this.userModel.findOne({ email })
    if (this.res) {
      if (this.res.length != 0) {
        return this.res
      }
      else {
        return 'something went wrong check back later!!'
      }

    }
    else {
      return 'user donnot exists!!'
    }
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    this.userModel.updateOne({ email }, { $set: updateUserDto })
  }

  remove(email: string) {
    return this.userModel.deleteOne({ email });
  }
}
