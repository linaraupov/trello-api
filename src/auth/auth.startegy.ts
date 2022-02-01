import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { JwtPayload } from './auth.types';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({ secretOrKey: configService.get<string>('jwt.secret') });
  }

  async validate(payload: JwtPayload) {
    return await this.authService.validateJwtToken(payload);
  }
}
