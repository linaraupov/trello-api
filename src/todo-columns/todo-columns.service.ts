import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/common.dto';
import { getPaginateResponse } from 'src/common/utils/get-pagination-response';
import { TodoColumn } from './todo-column.entity';
import { CreateOrUpdateTodColumnDto } from './todo-columns.dto';
import { TodoColumnsRepository } from './todo-columns.repository';

@Injectable()
export class TodoColumnsService {
  constructor(readonly repo: TodoColumnsRepository) {}

  async createOrUpdate(dto: CreateOrUpdateTodColumnDto, userId: string, columnId?: string) {
    try {
      const createdTodoColumn = this.repo.create({ ...dto, userId });

      return await this.repo.save(
        columnId ? { id: columnId, ...createdTodoColumn } : createdTodoColumn,
      );
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  async getOne(id: string, userId: string) {
    try {
      return await this.repo.findOne(id, { where: { userId } });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  async getMany({ limit, page }: PaginationQueryDto, userId: string) {
    try {
      const alias = 'todo_columns';
      const qb = this.repo
        .createQueryBuilder(alias)
        .where(`${alias}.userId = :userId`, { userId })
        .orderBy(`${alias}.createdAt`, 'DESC');

      return getPaginateResponse<TodoColumn>(qb, { limit, page });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  async deleteOne(id: string, userId: string) {
    try {
      const totoColumn = await this.repo.findOne(id, { where: userId });

      if (!totoColumn) {
        throw new NotFoundException('Column not found');
      }

      await this.repo.remove(totoColumn);

      return true;
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }
}
