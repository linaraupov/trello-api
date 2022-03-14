import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { AuthorizedRequest } from '../types/common.types';

export const IAM = createParamDecorator<keyof User>((data, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest<AuthorizedRequest>();

  if (data) {
    return user[data];
  }

  return user;
});
