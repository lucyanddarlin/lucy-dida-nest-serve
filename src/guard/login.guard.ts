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
import { PUBLIC_KEY } from 'src/decorator/public.decorator';

declare module 'express' {
  interface Request {
    user: Payload;
  }
}

const AUTHORIZATION_KEY = 'Bearer';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(Reflector)
  private readonly reflector: Reflector;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(PUBLIC_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();

    const authorizationStr = request.headers.authorization.split(' ');
    if (authorizationStr.length !== 2) {
      throw new UnauthorizedException(
        `The form of Authorization is wrong, it should be '${AUTHORIZATION_KEY} xxx'`,
      );
    }

    const authorizationKey = authorizationStr[0];
    if (authorizationKey !== AUTHORIZATION_KEY) {
      throw new UnauthorizedException('The Authorization key is wrong');
    }

    const authorizationJwt = authorizationStr[1];

    try {
      const user = await this.jwtService.verifyAsync<Payload>(authorizationJwt);
      request.user = user;
    } catch (error) {
      throw new UnauthorizedException('The JWT is expired');
    }

    return true;
  }
}
