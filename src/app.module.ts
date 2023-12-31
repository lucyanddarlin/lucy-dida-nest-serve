import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './guard/login.guard';
import { UserInfoModule } from './user-info/user-info.module';
import { UserInfo } from './user-info/entities/user-info.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'lucy',
      signOptions: {
        expiresIn: '10s',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'lucy',
      database: 'lucy-dida',
      synchronize: true,
      logging: true,
      entities: [User, UserInfo],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    UserModule,
    UserInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: LoginGuard }],
})
export class AppModule {}
