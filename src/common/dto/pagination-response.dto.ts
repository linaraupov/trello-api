import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<TData> {
  data: TData[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export function createPaginatedResponseDto<TData>(Dto: Type<TData>) {
  const ResponseDto = class extends PaginatedResponseDto<TData> {};
  ApiProperty({ type: () => [Dto] })(ResponseDto.prototype, 'data');
  ApiProperty({ type: 'number', nullable: false })(ResponseDto.prototype, 'count');
  ApiProperty({ type: 'number', nullable: false })(ResponseDto.prototype, 'total');
  ApiProperty({ type: 'number', nullable: false })(ResponseDto.prototype, 'page');
  ApiProperty({ type: 'number', nullable: false })(ResponseDto.prototype, 'pageCount');
  return ResponseDto;
}
