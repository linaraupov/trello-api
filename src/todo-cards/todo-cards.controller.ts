import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IAM } from 'src/common/decorators/iam.decorator';
import { CreateOrUpdateTodCardDto, GetTodoCardResponseDto } from './todo-card.dto';
import { TodoCardsService } from './todo-cards.service';

@ApiBearerAuth()
@ApiTags('Todo Cards')
@Controller('todo-cards')
export class TodoCardsController {
  constructor(private readonly service: TodoCardsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: GetTodoCardResponseDto })
  @Post('/')
  async createTodoCard(@Body() dto: CreateOrUpdateTodCardDto, @IAM('id') userId: string) {
    const createdCard = await this.service.createOrUpdateCard(dto, userId);
    return GetTodoCardResponseDto.createOne(createdCard);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: GetTodoCardResponseDto })
  @Patch('/:id')
  async updatedTo(
    @Body() dto: CreateOrUpdateTodCardDto,
    @Param('id') id: string,
    @IAM('id') userId: string,
  ) {
    const updatedCard = await this.service.createOrUpdateCard(dto, userId, id);
    return GetTodoCardResponseDto.createOne(updatedCard);
  }
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: [GetTodoCardResponseDto] })
  @Get('/column/:columnId')
  async getTodoCards(@Param('columnId') columnId: string, @IAM('id') userId: string) {
    const cards = await this.service.getMany(columnId, userId);

    return GetTodoCardResponseDto.createMany(cards);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: GetTodoCardResponseDto })
  @Get('/:id')
  async getTodoCard(@Param('id') id: string, @IAM('id') userId: string) {
    const card = await this.service.getOne(id, userId);
    return GetTodoCardResponseDto.createOne(card);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: Boolean })
  @Delete('/:id')
  async deleteTodoCard(@Param('id') id: string, @IAM('id') userId: string) {
    return await this.service.deleteOne(id, userId);
  }
}
