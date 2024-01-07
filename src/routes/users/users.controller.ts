import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializeInterceptor } from '../../interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {

  constructor(private userService: UsersService) {
  }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return  this.userService.create(body.email, body.password);
  }

  @UseInterceptors(SerializeInterceptor) // need to skip the password
  @Get('/:id')
  findUser(@Param('id') id: string) {
    console.log('2 handler is running')
    return this.userService.findOne(Number(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(Number(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }
}
