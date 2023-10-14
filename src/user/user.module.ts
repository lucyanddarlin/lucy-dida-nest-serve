import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserInfoModule } from 'src/user-info/user-info.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => UserInfoModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
