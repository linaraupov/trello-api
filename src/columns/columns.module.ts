import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsController } from './controllers';
import { ColumnsRepository } from './repositories';

import { ColumnsService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnsRepository])],
  providers: [ColumnsService],
  controllers: [ColumnsController],
})
export class ColumnsModule {}
