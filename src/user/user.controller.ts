import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/user-register.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { Public } from 'src/decorator/public.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '用户登陆' })
  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  @ApiOperation({ summary: '用户注册' })
  @Public()
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.register(registerUserDto);
  }
}
