import { BadRequestException, Injectable } from '@nestjs/common';
import { ISessionConfig } from 'src/common/config/config.interface';
import { ConfigService } from 'src/common/config/config.service';
import {
  checkExpiration,
  createRandomBytes,
  getExpiresTime,
} from '../auth.helper';
import { Session } from './sessions.entity';
import { SessionsRepository } from './sessions.repository';

@Injectable()
export class SessionsService {
  private bytes: number;
  private ttl: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly sessionsRepository: SessionsRepository,
  ) {
    const sessionConfig = this.configService.get<ISessionConfig>('session');
    this.bytes = sessionConfig.bytes;
    this.ttl = sessionConfig.ttl;
  }

  async getSessionToken(session: Session) {
    if (!session.token || !session.expires) {
      return await this.generateSessionToken(session.id);
    }

    const isExpired = checkExpiration(session.expires);
    if (isExpired) {
      return await this.generateSessionToken(session.id);
    }

    return session.token;
  }

  async invalidateSession(id: string) {
    const result = await this.sessionsRepository.updateSessionById(id, {
      token: undefined,
      expires: undefined,
    });
    if (!result) {
      throw new BadRequestException();
    }
    return result;
  }

  private async generateSessionToken(id: string) {
    const sessionToken = createRandomBytes(this.bytes);
    const expires = getExpiresTime(this.ttl).toString();

    const session = await this.sessionsRepository.updateSessionById(id, {
      token: sessionToken,
      expires,
    });
    if (!session) {
      throw new BadRequestException();
    }

    return sessionToken;
  }
}
