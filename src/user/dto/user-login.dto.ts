import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    name: '用户名称',
    example: 'lucy',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    name: '密码',
    example: '123',
  })
  @IsNotEmpty()
  password: string;
}
