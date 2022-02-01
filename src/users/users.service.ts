import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './users.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UsersRepository) public repo: UsersRepository) {}

  async create(dto: CreateUserDto) {
    try {
      const createdUser = this.repo.create(dto);

      return await this.repo.save(createdUser);
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  async findById(id: string) {
    return await this.repo.findOne(id);
  }

  async finByEmail(email: string) {
    return await this.repo.findOneOrFail({ email });
  }
}
