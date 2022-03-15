import { Module } from '@nestjs/common';
import { join } from 'path';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtModule } from './jwt/jwt.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [
    AuthenticationModule,
    JwtModule.register({ jwkFilepath: join(process.cwd(), './secret.json') }),
    SessionsModule,
  ],
  exports: [AuthenticationModule, JwtModule, SessionsModule],
})
export class AuthModule {}
