import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class PatchUserGuard implements CanActivate {
  constructor(private readonly usersRepo: UsersRepository) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.user.id !== request.params.id) {
      throw new BadRequestException('You can`t update this user');
    }

    return true;
  }
}
