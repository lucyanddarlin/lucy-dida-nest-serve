import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const PayLoadUser = createParamDecorator(
  (data, ctx: ExecutionContext): any => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
