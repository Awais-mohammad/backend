import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }



  @Post()
  create(@Body() createUserDto: CreateUserDto) {

    return this.usersService.create(createUserDto);
  }


  @Post('recoverpass')
  async pay(@Body() data: any) {



    return await this.usersService.recoverpass(data)

  }

  @Post('updatepas')
  async newpass(@Body() data: any, updateUserDto: UpdateUserDto,) {



    return await this.usersService.newpass(data, updateUserDto)

  }


  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.searchByEmail(email);

  }

  @Put(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(email, updateUserDto);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.usersService.remove(email);
  }


}
