import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AccountsRepository } from 'src/modules/accounts/accounts.repository';
import { JwtModule } from '../jwt/jwt.module';
import { SessionsModule } from '../sessions/sessions.module';
import { SessionsRepository } from '../sessions/sessions.repository';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountsRepository, SessionsRepository]),
    JwtModule.register({ jwkFilepath: join(process.cwd(), './secret.json') }),
    SessionsModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
