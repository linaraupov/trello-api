import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/users.dto';
import { SignInDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/sign-in')
  @ApiBody({ type: SignInDto })
  @ApiResponse({ type: String })
  async signIn(@Body() dto: SignInDto) {
    return await this.service.signIn(dto);
  }

  @Post('/sign-up')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ type: String })
  async signUp(@Body() dto: CreateUserDto) {
    return await this.service.signUp(dto);
  }
}
