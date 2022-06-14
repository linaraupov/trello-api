import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserResponseDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;
}
