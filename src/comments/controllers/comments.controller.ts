import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards';
import { IAM } from 'src/common/decorators';
import { CommentsService } from '../services';
import {
  CommentResponseDto,
  CreateCommentDto,
  GetCommentResponseDto,
  UpdateCommentDto,
} from '../dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Card Comments')
@Controller('comments')
export class CommentsController {
  constructor(readonly service: CommentsService) {}

  @ApiResponse({ status: 200, type: [CommentResponseDto] })
  @ApiOperation({ description: 'Get comments by card id' })
  @Get('/:cardId')
  async getMany(@Param('cardId', ParseUUIDPipe) cardId: string) {
    const comments = await this.service.getMany(cardId);
    return GetCommentResponseDto.createMany(comments);
  }

  @ApiResponse({ status: 200, type: CommentResponseDto })
  @ApiOperation({ description: 'Create comment' })
  @Post('/')
  async createOne(@Body() dto: CreateCommentDto, @IAM('id') authorId: string) {
    const comment = await this.service.createOne(dto, authorId);
    return GetCommentResponseDto.createOne(comment);
  }

  @ApiResponse({ status: 200, type: GetCommentResponseDto })
  @ApiOperation({ description: 'Update comment' })
  @Patch('/:id')
  async updateOne(
    @Body() dto: UpdateCommentDto,
    @IAM('id') authorId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const comment = await this.service.updateOne(dto, authorId, id);
    return GetCommentResponseDto.createOne(comment);
  }

  @ApiResponse({ status: 200, type: GetCommentResponseDto })
  @ApiOperation({ description: 'Delete comment' })
  @Delete('/:id')
  async deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    const comment = await this.service.deleteOne(id);
    return GetCommentResponseDto.createOne(comment);
  }
}
