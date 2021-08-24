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

  checkUser: any;

  async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email.toLocaleLowerCase()
    console.log(email);

    this.checkUser = await this.userModel.findOne({ "email": { "$regex": email, "$options": "i" } })
    console.log(this.checkUser);

    if (!this.checkUser) {
      const password = createUserDto.password;

      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      createUserDto.password = hash

      const isMatch = await bcrypt.compare(password, hash);
      console.log(isMatch);

      return new this.userModel(createUserDto).save();

    }
    else {
      return 'User with this email already exists!!!'
    }

  }


  findAll() {
    return this.userModel.find();
  }


  res: any;

  async searchByEmail(email: string) {
    this.res = await this.userModel.find({ "email": { "$regex": email, "$options": "i" } })
    if (this.res) {
      if (this.res.length != 0) {
        return this.res
      }
      else if (this.res.length == 0) {
        return 'no record exists!!!'
      }
      else {
        return 'something went wrong check back later!!'
      }

    }
    else {
      return 'we ran into a problem check back later!!'
    }
  }

  update(email: string, updateUserDto: UpdateUserDto) {




  }

  remove(email: string) {
 
    return this.userModel.deleteOne({ email });
  }
}
