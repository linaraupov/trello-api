import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsString()
  @Length(0, 254)
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty()
  @IsString()
  @Length(0, 254)
  password: string;
}
