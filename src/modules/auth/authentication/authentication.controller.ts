import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { IBaseConfig } from 'src/common/config/config.interface';
import { ConfigService } from 'src/common/config/config.service';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  JWT_USER_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from 'src/shared/consts/request/cookies.const';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  private jwtTtl: number;
  private sessionTtl: number;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
  ) {
    const config = this.configService.get<IBaseConfig>();
    this.jwtTtl = config.jwt.ttl;
    this.sessionTtl = config.session.ttl;
  }

  @Post('/login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken, jwtUser } =
      await this.authenticationService.login(body);

    response.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      maxAge: this.jwtTtl * 1000,
    });
    response.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      maxAge: this.sessionTtl * 1000,
      httpOnly: true,
    });
    response.cookie(JWT_USER_COOKIE_NAME, JSON.stringify(jwtUser), {
      maxAge: this.sessionTtl * 1000,
    });

    return { message: 'Login successfully' };
  }

  @Post('/logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwtUser = this.authenticationService.getJwtUserFromCookie(request);
    await this.authenticationService.logout(jwtUser);

    response.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
    response.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
    response.clearCookie(JWT_USER_COOKIE_NAME);

    return { message: 'Logout successfully' };
  }

  @Post('/refresh')
  async refreshAccess(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken =
      this.authenticationService.getRefreshTokenFromCookie(request);
    const jwtUser = this.authenticationService.getJwtUserFromCookie(request);
    const accessToken = await this.authenticationService.refreshAccess(
      jwtUser,
      refreshToken,
    );

    response.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      maxAge: this.jwtTtl * 1000,
    });

    return { message: 'Refresh token successfully' };
  }
}
