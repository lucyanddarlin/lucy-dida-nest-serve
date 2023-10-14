import { Length } from 'class-validator';

export class UserInfoDto {
  @Length(1, 11)
  phone: string;

  @Length(1, 11)
  email: string;
}
