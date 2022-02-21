import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoColumnsRepository } from './todo-columns.repository';
import { TodoColumnsService } from './todo-columns.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoColumnsRepository])],
  providers: [TodoColumnsService],
  controllers: [],
})
export class TodoColumnsModule {}
