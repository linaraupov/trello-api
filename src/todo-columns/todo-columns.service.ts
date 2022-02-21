import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
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
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  async getOne(id: string, userId: string) {
    return await this.repo.findOne(id, { where: { userId } });
  }

  async getMany({ limit, page }: PaginationQueryDto, userId: string) {
    const alias = 'todo_columns';
    const qb = this.repo
      .createQueryBuilder(alias)
      .where(`${alias}.userId = :userId`, { userId })
      .orderBy(`${alias}.createdAt`, 'DESC');

    return getPaginateResponse<TodoColumn>(qb, { limit, page });
  }

  async deleteOne(id: string, userId: string) {
    const totoColumns = await this.repo.findOne(id, { where: userId });

    if (!totoColumns) {
      throw new NotFoundException('Column not found');
    }

    await this.repo.remove(totoColumns);

    return true;
  }
}
