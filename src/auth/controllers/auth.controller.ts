import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto';
import { SignInDto } from '../dto';
import { AuthService } from '../services';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiBody({ type: SignInDto })
  @ApiResponse({ type: String })
  @ApiOperation({ description: 'Sign In' })
  @Post('/sign-in')
  async signIn(@Body() dto: SignInDto) {
    return await this.service.signIn(dto);
  }

  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ type: String })
  @ApiOperation({ description: 'Sign Up' })
  @Post('/sign-up')
  async signUp(@Body() dto: CreateUserDto) {
    return await this.service.signUp(dto);
  }
}
