import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from './entities/user-info.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { RegisterUserDto } from 'src/user/dto/user-register.dto';
import { UserService } from 'src/user/user.service';
import { UserInfoVo } from './vo/userinfo.vo';
import { UserInfoDto } from './dto/userinfo.dto';

@Injectable()
export class UserInfoService {
  @InjectRepository(UserInfo)
  private readonly userInfoRepository: Repository<UserInfo>;

  @Inject(forwardRef(() => UserService))
  private readonly userService: UserService;

  /**
   * 保存用户信息
   * @param registerUserDto
   */
  async saveUserInfo(registerUserDto: RegisterUserDto) {
    const user = new User();
    user.username = registerUserDto.username;
    user.password = registerUserDto.password;

    const userInfo = new UserInfo();
    userInfo.user = user;

    await this.userInfoRepository.save(userInfo);
  }

  /**
   * 获取用户信息
   * @param user
   */
  async getUserInfo({ userId, username }: Payload): Promise<UserInfoVo> {
    const { phone, email, createdAt } =
      await this.userService.getUserInfoByUserId(userId);
    return {
      userId,
      username,
      phone,
      email,
      createdAt,
    };
  }

  async updateUserInfo(
    { userId, username }: Payload,
    userInfoDto: Partial<UserInfoDto>,
  ): Promise<UserInfoVo> {
    const userInfo = await this.userService.getUserInfoByUserId(userId);

    const { phone, email, createdAt } = await this.userInfoRepository.save({
      ...userInfo,
      ...userInfoDto,
    });
    return {
      userId,
      username,
      phone,
      email,
      createdAt,
    };
  }
}
