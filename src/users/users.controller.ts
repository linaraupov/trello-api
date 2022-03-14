import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationQueryDto } from 'src/common/dto/common.dto';
import { PatchUserGuard } from './patch-user.guard';
import { CreateOrUpdateUserDto, GetManyUsersResponseDto, GetUserResponseDto } from './users.dto';
import { UsersService } from './users.service';
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: GetManyUsersResponseDto })
  @Get('/')
  async getUsers(@Query() query: PaginationQueryDto) {
    const users = await this.service.getMany(query);
    return { ...users, data: GetUserResponseDto.createMany(users.data) };
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: GetUserResponseDto })
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.service.getOne(id);
    return GetUserResponseDto.createOne(user);
  }

  @UseGuards(JwtAuthGuard, PatchUserGuard)
  @ApiResponse({ status: 200, type: GetUserResponseDto })
  @Patch('/:id')
  async patchUser(@Body() body: CreateOrUpdateUserDto, @Param('id') id: string) {
    const user = await this.service.createOrUpdate(body, id);
    return GetUserResponseDto.createOne(user);
  }
}
