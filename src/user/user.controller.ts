import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/user-register.dto';
import { LoginUserDto } from './dto/user-login.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '用户登陆' })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { password, ...rest } = await this.userService.login(loginUserDto);
    return rest;
  }

  @ApiOperation({ summary: '用户注册' })
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.register(registerUserDto);
  }
}
