import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JWTConfigService implements JwtOptionsFactory {
  constructor(readonly configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>('jwt.secret'),
      signOptions: {
        expiresIn: '1d',
      },
    };
  }
}
