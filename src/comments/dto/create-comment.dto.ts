import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ maxLength: 254 })
  @IsString()
  @Length(0, 254)
  text: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  cardId: string;
}
