import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Request } from 'express';

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

export interface AuthorizedRequest extends Request<any, any, any> {
  user: User;
}
