import { EntityRepository, Repository } from 'typeorm';
import { TodoColumn } from './todo-column.entity';

@EntityRepository(TodoColumn)
export class TodoColumnsRepository extends Repository<TodoColumn> {}
