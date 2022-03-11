import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoColumnsController } from './todo-columns.controller';
import { TodoColumnsRepository } from './todo-columns.repository';
import { TodoColumnsService } from './todo-columns.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoColumnsRepository])],
  providers: [TodoColumnsService],
  controllers: [TodoColumnsController],
})
export class TodoColumnsModule {}
