import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { TodoCard } from './todo-card.entity';

export class CreateOrUpdateTodCardDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  todoColumnId: string;
}

export class GetTodoCardResponseDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  constructor(data: GetTodoCardResponseDto) {
    this.id = data.id;
    this.name = data.name;
    this.userId = data.userId;
    this.description = data.description;
  }

  static createOne(card: TodoCard) {
    return new GetTodoCardResponseDto({
      ...card,
    });
  }

  static createMany(cards: TodoCard[]) {
    return cards.map(GetTodoCardResponseDto.createOne);
  }
}
