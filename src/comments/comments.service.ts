import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrUpdateCommentDto } from './comments.dto';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(readonly repo: CommentsRepository) {}

  async createOrUpdateOne(dto: CreateOrUpdateCommentDto, authorId: string, id?: string) {
    try {
      const createdComment = this.repo.create({ ...dto, authorId });

      return await this.repo.save(id ? { ...createdComment, id } : createdComment);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  async getMany(cardId: string) {
    try {
      return await this.repo.find({ where: { todoCardId: cardId }, relations: ['author'] });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  async deleteOne(id: string) {
    try {
      const comment = await this.repo.findOne(id);

      if (!comment) {
        throw new NotFoundException('Comment not found');
      }

      await this.repo.delete(id);
      return true;
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }
}
