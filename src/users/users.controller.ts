import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Query,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { Serialize } from './interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('signup')
  user(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
  }

  // @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('handler is running');

    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
