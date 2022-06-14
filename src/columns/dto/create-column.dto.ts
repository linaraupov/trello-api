import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({ maxLength: 254 })
  @IsString()
  @Length(0, 254)
  name: string;
}
