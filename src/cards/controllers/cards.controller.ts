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
import { CardsService } from '../services';
import { CardResponseDto, CreateCardDto, GetCardResponseDto, UpdateCardDto } from '../dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly service: CardsService) {}

  @ApiResponse({ status: 200, type: CardResponseDto })
  @ApiOperation({ description: 'Create card' })
  @Post('/')
  async createOne(@Body() dto: CreateCardDto, @IAM('id') userId: string) {
    const createdCard = await this.service.createOne(dto, userId);
    return GetCardResponseDto.createOne(createdCard);
  }

  @ApiResponse({ status: 200, type: CardResponseDto })
  @ApiOperation({ description: 'Update card' })
  @Patch('/:id')
  async updateOne(
    @Body() dto: UpdateCardDto,
    @Param('id', ParseUUIDPipe) id: string,
    @IAM('id') userId: string,
  ) {
    const updatedCard = await this.service.updateOne(dto, userId, id);
    return GetCardResponseDto.createOne(updatedCard);
  }
  @ApiResponse({ status: 200, type: [CardResponseDto] })
  @ApiOperation({ description: 'Get cards' })
  @Get('/')
  async getMany(@IAM('id') userId: string) {
    const cards = await this.service.getMany(userId);

    return GetCardResponseDto.createMany(cards);
  }

  @ApiResponse({ status: 200, type: CardResponseDto })
  @ApiOperation({ description: 'Get card by id' })
  @Get('/:id')
  async getOne(@Param('id', ParseUUIDPipe) id: string, @IAM('id') userId: string) {
    const card = await this.service.getOne(id, userId);
    return GetCardResponseDto.createOne(card);
  }

  @ApiResponse({ status: 200, type: Boolean })
  @ApiOperation({ description: 'Delete' })
  @Delete('/:id')
  async deleteOne(@Param('id', ParseUUIDPipe) id: string, @IAM('id') userId: string) {
    return await this.service.deleteOne(id, userId);
  }
}
