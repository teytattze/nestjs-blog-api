import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountRole } from 'src/modules/accounts/accounts.enum';
import { RequestWithUser } from 'src/shared/interfaces/request.interface';
import { ROLES_KEY } from '../decorators/auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.get<AccountRole[]>(
      ROLES_KEY,
      ctx.getHandler(),
    );

    if (!roles) {
      return true;
    }

    const request: RequestWithUser = ctx.switchToHttp().getRequest();
    const role = request.user.role;

    return roles.includes(role);
  }
}
