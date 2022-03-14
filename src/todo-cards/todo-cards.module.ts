import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoCardsController } from './todo-cards.controller';
import { TodoCardsRepository } from './todo-cards.repository';
import { TodoCardsService } from './todo-cards.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoCardsRepository])],
  controllers: [TodoCardsController],
  providers: [TodoCardsService],
})
export class TodoCardsModule {}
