import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsString()
  @Length(0, 254)
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({ minLength: 8, maxLength: 254 })
  @IsString()
  @Length(8, 254)
  password: string;
}
