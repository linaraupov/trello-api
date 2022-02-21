import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import configurations from './common/config/configurations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './services/typeorm-config.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTConfigService } from './auth/jwt-config.service';
import { TodoColumnsModule } from './todo-columns/todo-columns.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
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
    TodoColumnsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
