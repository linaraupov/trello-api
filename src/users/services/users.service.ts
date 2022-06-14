import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UsersRepository } from '../repositories';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UsersRepository) public repo: UsersRepository) {}

  async createOne(dto: CreateUserDto) {
    try {
      const user = this.repo.create(dto);

      return this.repo.save(user);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  async updateOne(dto: UpdateUserDto, id: string) {
    try {
      const user = this.repo.create(dto);

      return this.repo.save({ ...user, id });
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  async getOne(id: string) {
    try {
      return this.repo.findOneOrFail(id);
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  async getByEmail(email: string) {
    try {
      return this.repo.findOneOrFail({ email });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }
}
