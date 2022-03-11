import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IAM } from 'src/common/decorators/iam.decorator';
import { PaginationQueryDto } from 'src/common/dto/common.dto';
import {
  CreateOrUpdateTodColumnDto,
  GetManyTodoColumnsResponseDto,
  GetTodoColumnsResponseDto,
} from './todo-columns.dto';
import { TodoColumnsService } from './todo-columns.service';

@ApiBearerAuth()
@ApiTags('Todo Columns')
@Controller('todo-columns')
export class TodoColumnsController {
  constructor(private readonly service: TodoColumnsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: GetTodoColumnsResponseDto })
  @Post('/')
  async createTodoColumn(@Body() dto: CreateOrUpdateTodColumnDto, @IAM('id') userId: string) {
    const createdColumn = await this.service.createOrUpdate(dto, userId);
    return GetTodoColumnsResponseDto.createOne(createdColumn);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: GetTodoColumnsResponseDto })
  @Patch('/:id')
  async updateTodoColumn(
    @Body() dto: CreateOrUpdateTodColumnDto,
    @IAM('id') userId: string,
    @Param('id') id: string,
  ) {
    const updatedColumn = await this.service.createOrUpdate(dto, userId, id);
    return GetTodoColumnsResponseDto.createOne(updatedColumn);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: GetManyTodoColumnsResponseDto })
  @Get('/')
  async getTodoColumns(@Query() body: PaginationQueryDto, @IAM('id') userId: string) {
    const todoColumns = await this.service.getMany(body, userId);
    return { ...todoColumns, data: GetTodoColumnsResponseDto.createMany(todoColumns.data) };
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: GetTodoColumnsResponseDto })
  @Get('/:id')
  async getTodoColumn(@Param('id') id: string, @IAM('id') userId: string) {
    const todoColumn = await this.service.getOne(id, userId);
    return GetTodoColumnsResponseDto.createOne(todoColumn);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: GetTodoColumnsResponseDto })
  @Delete('/:id')
  async deleteTodoColumn(@Param('id') id: string, @IAM('id') userId: string) {
    return await this.service.deleteOne(id, userId);
  }
}
