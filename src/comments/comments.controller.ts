import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IAM } from 'src/common/decorators/iam.decorator';
import { CreateOrUpdateCommentDto, GetCommentResponseDto } from './comments.dto';
import { CommentsService } from './comments.service';

@ApiBearerAuth()
@ApiTags('Card Comments')
@Controller('comments')
export class CommentsController {
  constructor(readonly service: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: [GetCommentResponseDto] })
  @Get('/:cardId')
  async getComments(@Param('cardId') cardId: string) {
    const comments = await this.service.getMany(cardId);
    return GetCommentResponseDto.createMany(comments);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: GetCommentResponseDto })
  @Post('/')
  async createComment(@Body() dto: CreateOrUpdateCommentDto, @IAM('id') authorId: string) {
    const comment = await this.service.createOrUpdateOne(dto, authorId);

    return GetCommentResponseDto.createOne(comment);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: GetCommentResponseDto })
  @Patch('/:id')
  async updateComment(
    @Body() dto: CreateOrUpdateCommentDto,
    @IAM('id') authorId: string,
    @Param('id') id: string,
  ) {
    const comment = await this.service.createOrUpdateOne(dto, authorId, id);

    return GetCommentResponseDto.createOne(comment);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: Boolean })
  @Delete('/:id')
  async deleteComment(@Param('id') id: string) {
    return await this.service.deleteOne(id);
  }
}
