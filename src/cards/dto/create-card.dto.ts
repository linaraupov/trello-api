import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({ maxLength: 254 })
  @IsString()
  @Length(0, 254)
  name: string;

  @ApiProperty({ required: false, maxLength: 254 })
  @IsOptional()
  @IsString()
  @Length(0, 254)
  description?: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  columnId: string;
}
