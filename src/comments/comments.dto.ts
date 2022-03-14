import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { User } from 'src/users/user.entity';
import { Comment } from './comment.entity';

export class CreateOrUpdateCommentDto {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  todoCardId: string;
}

export class GetCommentResponseDto {
  id: string;

  text: string;

  todoCardId: string;

  author: User;

  createdAt: Date;

  constructor(dto: GetCommentResponseDto) {
    this.id = dto.id;
    this.author = dto.author;
    this.todoCardId = dto.todoCardId;
    this.createdAt = dto.createdAt;
    this.text = dto.text;
  }

  static createOne(comment: Comment) {
    return new GetCommentResponseDto({ ...comment });
  }

  static createMany(comments: Comment[]) {
    return comments.map((comment) => new GetCommentResponseDto(comment));
  }
}
