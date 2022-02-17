import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export class PaginationQueryDto implements IPaginationOptions {
  @ApiPropertyOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly limit: number = 10;

  @ApiPropertyOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly page: number = 1;
}
