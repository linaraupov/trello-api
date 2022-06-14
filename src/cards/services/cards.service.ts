import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCardDto, UpdateCardDto } from '../dto';
import { CardsRepository } from '../repositories/cards.repository';

@Injectable()
export class CardsService {
  constructor(readonly repo: CardsRepository) {}

  async createOne(dto: CreateCardDto, userId: string) {
    try {
      const createdCard = this.repo.create({ ...dto, userId });
      return await this.repo.save(createdCard);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  async updateOne(dto: UpdateCardDto, userId: string, id: string) {
    try {
      return await this.repo.save({ id, userId, ...dto });
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  async getOne(id: string, userId: string) {
    const card = await this.repo.findOne(id, { where: { userId } });
    if (!card) {
      throw new NotFoundException('Card not found');
    }

    return card;
  }

  async getMany(userId: string) {
    try {
      return await this.repo.find({ where: { userId } });
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
      return card;
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }
}
