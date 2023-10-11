import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/user-register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async register(registerUserDto: RegisterUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { username: registerUserDto.username },
    });
    if (existUser) {
      throw new HttpException('The username is exist', HttpStatus.BAD_REQUEST);
    }
    return await this.userRepository.save(registerUserDto);
  }
}
