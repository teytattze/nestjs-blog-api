import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, FindOneOptions, Repository } from 'typeorm';
import { Session } from '../auth/sessions/sessions.entity';
import { RegisterAccountDto } from './dto/register-account.dto';
import { Account } from './accounts.entity';

@EntityRepository(Account)
export class AccountsRepository extends Repository<Account> {
  private readonly logger = new Logger(AccountsRepository.name);

  async getAllAccounts() {
    try {
      return await this.find();
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getAccountById(id: string) {
    try {
      return await this.findOne(id);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getSingleAccount(options: FindOneOptions<Account>) {
    try {
      return await this.findOne({ ...options });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async registerAccount(data: RegisterAccountDto, session: Session) {
    try {
      const user = await this.create(data);
      user.session = session;
      await this.save(user);
      return user;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async deleteAccountById(id: string) {
    try {
      return await this.delete(id);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
