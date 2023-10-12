import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { RegisterUserDto } from './dto/user-register.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { BusinessException } from 'src/common/exceptions/business.exceptions.filter';
import { JwtService } from '@nestjs/jwt';

/**
 * bcrypt 加盐轮数
 */
const saltRounds = 10;

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  /**
   * 用户登陆
   * @param loginUserDto
   */
  async login(loginUserDto: LoginUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { username: loginUserDto.username },
    });
    if (!existUser) {
      throw BusinessException.throwBadRequest('The username is not exist');
    }
    const result = await bcrypt.compare(
      loginUserDto.password,
      existUser.password,
    );
    if (!result) {
      throw BusinessException.throwBadRequest('The password is wrong');
    }

    const access_token = await this.jwtService.signAsync(
      {
        userId: existUser.id,
        username: existUser.username,
      },
      {
        expiresIn: '1d',
      },
    );

    const refresh_token = await this.jwtService.signAsync(
      {
        userId: existUser.id,
        username: existUser.username,
      },
      {
        expiresIn: '1d',
      },
    );

    return { access_token, refresh_token };
  }

  /**
   * 用户注册
   * @param registerUserDto
   */
  async register(registerUserDto: RegisterUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { username: registerUserDto.username },
    });
    if (existUser) {
      throw BusinessException.throwBadRequest('The username is exist');
    }
    const hashedPassword = await bcrypt.hash(
      registerUserDto.password,
      saltRounds,
    );
    await this.userRepository.save({
      ...registerUserDto,
      password: hashedPassword,
    });
    return 'register successfully';
  }
}
