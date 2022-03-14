import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrUpdateTodCardDto } from './todo-card.dto';
import { TodoCardsRepository } from './todo-cards.repository';

@Injectable()
export class TodoCardsService {
  constructor(readonly repo: TodoCardsRepository) {}

  async createOrUpdateCard(dto: CreateOrUpdateTodCardDto, userId: string, cardId?: string) {
    try {
      const card = this.repo.create({ ...dto, userId });
      return await this.repo.save(cardId ? { id: cardId, ...card } : card);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  async getOne(id: string, userId: string) {
    try {
      const card = await this.repo.findOne(id, { where: { userId } });
      if (!card) {
        throw new NotFoundException('Card not found');
      }
      return card;
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  async getMany(columnId: string, userId: string) {
    try {
      return await this.repo.find({ where: { todoColumnId: columnId, userId } });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  async deleteOne(id: string, userId: string) {
    try {
      const card = await this.repo.findOne(id, { where: { userId } });

      if (!card) {
        throw new NotFoundException('Card not found');
      }

      await this.repo.remove(card);
      return true;
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }
}
