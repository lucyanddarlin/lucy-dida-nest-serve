import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    name: '用户名',
  })
  @IsNotEmpty()
  @Length(1, 30)
  username: string;

  @ApiProperty({
    name: '密码',
  })
  @IsNotEmpty()
  @Length(1, 30)
  password: string;
}
