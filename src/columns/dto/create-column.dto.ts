import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty()
  @IsString()
  @Length(0, 254)
  name: string;
}
