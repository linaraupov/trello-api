import { Comment } from '../entities/comment.entity';
import { CommentResponseDto } from './comment-response.dto';
export class GetCommentResponseDto extends CommentResponseDto {
  constructor(dto: GetCommentResponseDto) {
    super();
    this.id = dto.id;
    this.author = dto.author;
    this.cardId = dto.cardId;
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
