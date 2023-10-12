import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { REQUIRE_LOGIN_KEY } from 'src/decorator/require-login.decorator';

const AUTHORIZATION_KEY = 'Bearer';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(Reflector)
  private readonly reflector: Reflector;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requireLogin = this.reflector.getAllAndOverride(REQUIRE_LOGIN_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);
    if (!requireLogin) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const authorizationStr = request.headers.authorization.split(' ');
    if (authorizationStr.length !== 2) {
      throw new UnauthorizedException('The form of Authorization is wrong');
    }
    const authorizationKey = authorizationStr[0];
    if (authorizationKey !== AUTHORIZATION_KEY) {
      throw new UnauthorizedException('The Authorization key is wrong');
    }

    const authorizationJwt = authorizationStr[1];

    try {
      await this.jwtService.verifyAsync(authorizationJwt);
    } catch (error) {
      throw new UnauthorizedException('The JWT is expired');
    }

    return true;
  }
}
