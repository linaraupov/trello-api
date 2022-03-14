import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './auth.dto';
import { User } from 'src/users/user.entity';
import { JwtPayload } from './auth.types';
import { CreateOrUpdateUserDto } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, readonly jwtService: JwtService) {}

  async validateUser({ email, password }: SignInDto) {
    const user = await this.usersService.getByEmail(email);
    const hashPassword = crypto.createHmac('sha256', password).digest('hex');

    if (!user || user.password !== hashPassword) {
      throw new NotFoundException('Incorrect email or password');
    }

    return user;
  }

  async createJwtToken({ id, email, name }: User) {
    const payload: JwtPayload = { id, email, name };
    return this.jwtService.sign(payload);
  }

  async validateJwtToken(payload: JwtPayload) {
    const user = await this.usersService.getOne(payload.id);
    if (!user) {
      return null;
    }

    return user;
  }

  async signIn(dto: SignInDto) {
    try {
      const user = await this.validateUser(dto);

      return await this.createJwtToken(user);
    } catch (err) {
      throw err;
    }
  }

  async signUp(dto: CreateOrUpdateUserDto) {
    try {
      const user = await this.usersService.createOrUpdate(dto);

      return await this.createJwtToken(user);
    } catch (err) {
      throw err;
    }
  }
}
