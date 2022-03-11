import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { createPaginatedResponseDto } from 'src/common/types/common.types';
import { TodoColumn } from './todo-column.entity';

export class CreateOrUpdateTodColumnDto {
  @ApiProperty()
  @IsString()
  @Length(0, 254)
  name: string;
}

export class GetTodoColumnsResponseDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  name: string;

  constructor(data: GetTodoColumnsResponseDto) {
    this.id = data.id;
    this.name = data.name;
    this.userId = data.userId;
  }

  static createOne(column: TodoColumn) {
    return new GetTodoColumnsResponseDto({
      ...column,
    });
  }

  static createMany(columns: TodoColumn[]) {
    return columns.map(GetTodoColumnsResponseDto.createOne);
  }
}

export class GetManyTodoColumnsResponseDto extends createPaginatedResponseDto(
  GetTodoColumnsResponseDto,
) {}
