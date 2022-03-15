import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Account } from 'src/modules/accounts/accounts.entity';
import { AccountsRepository } from 'src/modules/accounts/accounts.repository';
import {
  JWT_USER_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from 'src/shared/consts/request/cookies.const';
import { compareHashedString } from 'src/utils/hash.util';
import { IJwtUser } from '../jwt/jwt.interface';
import { JwtService } from '../jwt/jwt.service';
import { SessionsService } from '../sessions/sessions.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionsService: SessionsService,
    private readonly accountsRepository: AccountsRepository,
  ) {}

  async login(data: LoginDto) {
    const account = await this.verifyEmailAndPassword(data);

    const payload: IJwtUser = {
      id: account.id,
      firstName: account.firstName,
      lastName: account.lastName,
      username: account.username,
      email: account.email,
      role: account.role,
      verified: account.verified,
    };

    const accessToken = await this.jwtService.generateJwtToken(payload);
    const refreshToken = await this.sessionsService.getSessionToken(
      account.session,
    );

    return { accessToken, refreshToken, jwtUser: payload };
  }

  async logout(jwtUser: IJwtUser) {
    const account = await this.accountsRepository.getSingleAccount({
      where: { email: jwtUser.email },
      relations: ['session'],
    });
    if (!account) {
      throw new UnauthorizedException();
    }
    return await this.sessionsService.invalidateSession(account.session.id);
  }

  async refreshAccess(jwtUser: IJwtUser, refreshToken: string) {
    const account = await this.accountsRepository.getSingleAccount({
      where: { email: jwtUser.email },
      relations: ['session'],
    });
    if (!account) {
      throw new UnauthorizedException();
    }

    const sessionToken = account.session.token;
    if (refreshToken !== sessionToken) {
      throw new UnauthorizedException();
    }

    return await this.jwtService.generateJwtToken(jwtUser);
  }

  async verifyEmailAndPassword(data: LoginDto): Promise<Account> {
    const { password, email } = data;

    const account = await this.accountsRepository.getSingleAccount({
      where: { email },
      relations: ['session'],
    });
    if (!account) {
      throw new UnauthorizedException();
    }
    const passwordMatched = await compareHashedString(
      password,
      account.password,
    );
    if (!passwordMatched) {
      throw new UnauthorizedException();
    }

    return account;
  }

  getJwtUserFromCookie(request: Request): IJwtUser {
    try {
      return JSON.parse(request.cookies[JWT_USER_COOKIE_NAME]);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  getRefreshTokenFromCookie(request: Request): string {
    try {
      return request.cookies[REFRESH_TOKEN_COOKIE_NAME];
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
