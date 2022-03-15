import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from 'src/modules/auth/jwt/jwt.service';
import { ACCESS_TOKEN_HEADER_NAME } from 'src/shared/consts/request/headers.const';
import { RequestWithUser } from 'src/shared/interfaces/request.interface';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request: RequestWithUser = ctx.switchToHttp().getRequest();
    const accessToken = request.headers[ACCESS_TOKEN_HEADER_NAME];

    const payload = await this.jwtService.verifyJwtToken(accessToken);
    request.user = payload.user;

    if (!payload) {
      return false;
    }
    return true;
  }
}
