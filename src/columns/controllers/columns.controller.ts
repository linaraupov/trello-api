import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards';
import { IAM } from 'src/common/decorators';
import { PaginationQueryDto } from 'src/common/dto';
import { ColumnsService } from '../services';
import {
  ColumnResponseDto,
  CreateColumnDto,
  GetColumnsResponseDto,
  GetManyColumnsResponseDto,
  UpdateColumnDto,
} from '../dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Columns')
@Controller('columns')
export class ColumnsController {
  constructor(private readonly service: ColumnsService) {}

  @ApiResponse({ status: 200, type: ColumnResponseDto })
  @ApiOperation({ description: 'Create column' })
  @Post('/')
  async createOne(@Body() dto: CreateColumnDto, @IAM('id') userId: string) {
    const createdColumn = await this.service.createOne(dto, userId);
    return GetColumnsResponseDto.createOne(createdColumn);
  }

  @ApiResponse({ status: 200, type: ColumnResponseDto })
  @ApiOperation({ description: 'Update column' })
  @Patch('/:id')
  async updateOne(
    @Body() dto: UpdateColumnDto,
    @IAM('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const updatedColumn = await this.service.updateOne(dto, userId, id);
    return GetColumnsResponseDto.createOne(updatedColumn);
  }

  @ApiResponse({ status: 200, type: GetManyColumnsResponseDto })
  @ApiOperation({ description: 'Get columns' })
  @Get('/')
  async getMany(@Query() body: PaginationQueryDto, @IAM('id') userId: string) {
    const columns = await this.service.getMany(body, userId);
    return { ...columns, data: GetColumnsResponseDto.createMany(columns.data) };
  }

  @ApiResponse({ status: 200, type: ColumnResponseDto })
  @ApiOperation({ description: 'Get column by id' })
  @Get('/:id')
  async getOne(@Param('id', ParseUUIDPipe) id: string, @IAM('id') userId: string) {
    const column = await this.service.getOne(id, userId);
    return GetColumnsResponseDto.createOne(column);
  }

  @ApiResponse({ status: 200, type: Boolean })
  @ApiOperation({ description: 'Delete column' })
  @Delete('/:id')
  async deleteOne(@Param('id', ParseUUIDPipe) id: string, @IAM('id') userId: string) {
    return await this.service.deleteOne(id, userId);
  }
}
