import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto';
import { getPaginateResponse } from 'src/common/utils';
import { CreateColumnDto, UpdateColumnDto } from '../dto';
import { Column } from '../entities';
import { ColumnsRepository } from '../repositories';

@Injectable()
export class ColumnsService {
  constructor(readonly repo: ColumnsRepository) {}

  async createOne(dto: CreateColumnDto, userId: string) {
    try {
      const createdColumn = this.repo.create({ ...dto, userId });

      return this.repo.save(createdColumn);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  async updateOne(dto: UpdateColumnDto, userId: string, id?: string) {
    try {
      return this.repo.save({ ...dto, userId, id });
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  async getOne(id: string, userId: string) {
    try {
      return this.repo.findOne(id, { where: { userId } });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  async getMany({ limit, page }: PaginationQueryDto, userId: string) {
    try {
      const alias = 'columns';
      const qb = this.repo
        .createQueryBuilder(alias)
        .where(`${alias}.userId = :userId`, { userId })
        .orderBy(`${alias}.createdAt`, 'DESC');

      return getPaginateResponse<Column>(qb, { limit, page });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  async deleteOne(id: string, userId: string) {
    const totoColumn = await this.repo.findOne(id, { where: userId });

    if (!totoColumn) {
      throw new NotFoundException('Column not found');
    }

    try {
      await this.repo.remove(totoColumn);

      return totoColumn;
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }
}
