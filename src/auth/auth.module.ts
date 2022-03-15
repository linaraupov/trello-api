import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { AuthStrategy } from './strategies';
import { JWTConfigService } from '../common/services';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useClass: JWTConfigService,
    }),
  ],
  providers: [AuthService, AuthStrategy],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
