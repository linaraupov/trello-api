import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from '../dto';
import { CommentsRepository } from '../repositories';

@Injectable()
export class CommentsService {
  constructor(readonly repo: CommentsRepository) {}

  async createOne(dto: CreateCommentDto, authorId) {
    try {
      const createdComment = this.repo.create({ ...dto, authorId });

      return await this.repo.save(createdComment);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  async updateOne(dto: UpdateCommentDto, authorId: string, id: string) {
    try {
      return await this.repo.save({ id, authorId, ...dto });
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  async getMany(cardId: string) {
    try {
      return await this.repo.find({ where: { cardId }, relations: ['author'] });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  async deleteOne(id: string) {
    const comment = await this.repo.findOne(id);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    try {
      await this.repo.delete(id);
      return comment;
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }
}
