import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PayLoadUser } from 'src/decorator/payload-user.decorator';
import { UserInfoDto } from './dto/userinfo.dto';

@ApiTags('UserInfo')
@Controller('userinfo')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @ApiOperation({ summary: '获取用户信息' })
  @Get()
  async getUserInfo(@PayLoadUser() user: Payload) {
    return await this.userInfoService.getUserInfo(user);
  }

  @ApiOperation({ summary: '修改用户信息' })
  @Post()
  async updateUserInfo(
    @PayLoadUser() user: Payload,
    @Body() userInfoDto: Partial<UserInfoDto>,
  ) {
    return this.userInfoService.updateUserInfo(user, userInfoDto);
  }
}
