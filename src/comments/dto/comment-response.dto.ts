import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { User } from 'src/users/entities';

export class CommentResponseDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsString()
  cardId: string;

  @ApiProperty({ type: User })
  author: User;

  @ApiProperty()
  @IsDate()
  createdAt: Date;
}
