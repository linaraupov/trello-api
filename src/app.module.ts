import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { envMap } from './common/configurations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTConfigService } from './common/services';
import { ColumnsModule } from './columns/columns.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmConfigService } from './common/services';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envMap],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    PassportModule,
    JwtModule.registerAsync({
      useClass: JWTConfigService,
    }),
    UsersModule,
    AuthModule,
    ColumnsModule,
    CardsModule,
    CommentsModule,
  ],
})
export class AppModule {}
