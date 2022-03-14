import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';
import { createPaginatedResponseDto } from 'src/common/types/common.types';
import { User } from './user.entity';

export class CreateOrUpdateUserDto {
  @ApiProperty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty()
  @IsString()
  @Length(0, 254)
  password: string;

  @ApiProperty()
  @IsString()
  @Length(0, 254)
  name: string;
}

export class GetUserResponseDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  constructor(data: GetUserResponseDto) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
  }

  static createOne(user: User) {
    return new GetUserResponseDto({
      ...user,
    });
  }

  static createMany(users: User[]) {
    return users.map(GetUserResponseDto.createOne);
  }
}

export class GetManyUsersResponseDto extends createPaginatedResponseDto(GetUserResponseDto) {}
