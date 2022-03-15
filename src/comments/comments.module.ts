import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './controllers';
import { CommentsRepository } from './repositories';
import { CommentsService } from './services/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsRepository])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
