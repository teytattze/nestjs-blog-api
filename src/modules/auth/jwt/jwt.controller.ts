import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AccountRole } from 'src/modules/accounts/accounts.enum';
import { JwtService } from './jwt.service';

@ApiTags('Jwt')
@Controller('auth/jwt')
export class JwtController {
  constructor(private readonly jwtService: JwtService) {}

  @Auth(AccountRole.ADMIN)
  @Get('/rotation')
  async refreshJwks() {
    return this.jwtService.refreshJwks();
  }

  @Get('/token')
  async getJwtToken() {
    return this.jwtService.generateJwtToken({
      id: '621060cf-d29a-4e21-b293-5ca84a3a8857',
      firstName: 'Tat Tze',
      lastName: 'Tey',
      username: 'teytattze',
      email: 'tattzetey@gmail.com',
      role: AccountRole.MEMBER,
      verified: false,
    });
  }
}
