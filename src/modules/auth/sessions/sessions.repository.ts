import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Session } from './sessions.entity';
import { ISessionData } from './sessions.interface';

@EntityRepository(Session)
export class SessionsRepository extends Repository<Session> {
  private readonly logger = new Logger(SessionsRepository.name);

  async registerSession() {
    try {
      return await this.create();
    } catch (err) {
      this.logger.error(err);
    }
  }

  async getSessionById(id: string): Promise<Session> {
    try {
      return await this.findOne(id);
    } catch (err) {
      this.logger.error(err);
    }
  }

  async updateSessionById(id: string, data: ISessionData) {
    try {
      return await this.update(id, { ...data });
    } catch (err) {
      this.logger.error(err);
    }
  }
}
