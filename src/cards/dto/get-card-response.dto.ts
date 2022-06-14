import { Card } from '../entities';
import { CardResponseDto } from './card-response.dto';

export class GetCardResponseDto extends CardResponseDto {
  constructor(data: GetCardResponseDto) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.columnId = data.columnId;
  }

  static createOne(card: Card) {
    return new GetCardResponseDto({
      ...card,
    });
  }

  static createMany(cards: Card[]) {
    return cards.map(GetCardResponseDto.createOne);
  }
}
