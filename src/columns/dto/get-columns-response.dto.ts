import { createPaginatedResponseDto } from 'src/common/dto';
import { Column } from '../entities/column.entity';
import { ColumnResponseDto } from './column-response.dto';

export class GetColumnsResponseDto extends ColumnResponseDto {
  constructor(data: GetColumnsResponseDto) {
    super();
    this.id = data.id;
    this.name = data.name;
  }

  static createOne(column: Column) {
    return new GetColumnsResponseDto({
      ...column,
    });
  }

  static createMany(columns: Column[]) {
    return columns.map(GetColumnsResponseDto.createOne);
  }
}

export class GetManyColumnsResponseDto extends createPaginatedResponseDto(GetColumnsResponseDto) {}
