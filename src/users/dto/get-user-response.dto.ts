import { User } from '../entities';
import { UserResponseDto } from './user-response.dto';

export class GetUserResponseDto extends UserResponseDto {
  constructor(data: UserResponseDto) {
    super();
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
