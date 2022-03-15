import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsController } from './controllers';
import { CardsRepository } from './repositories/cards.repository';
import { CardsService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([CardsRepository])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
