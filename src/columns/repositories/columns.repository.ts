import { EntityRepository, Repository } from 'typeorm';
import { Column } from '../entities';

@EntityRepository(Column)
export class ColumnsRepository extends Repository<Column> {}
