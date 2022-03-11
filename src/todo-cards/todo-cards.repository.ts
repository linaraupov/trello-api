import { TodoCard } from './todo-card.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TodoCard)
export class TodoCardsRepository extends Repository<TodoCard> {}
