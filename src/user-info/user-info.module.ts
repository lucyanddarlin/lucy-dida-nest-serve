import { Module, forwardRef } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './entities/user-info.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo]), forwardRef(() => UserModule)],
  controllers: [UserInfoController],
  providers: [UserInfoService],
  exports: [UserInfoService],
})
export class UserInfoModule {}
