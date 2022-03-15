import { EntityRepository, Repository } from 'typeorm';
import { Card } from '../entities';

@EntityRepository(Card)
export class CardsRepository extends Repository<Card> {}
