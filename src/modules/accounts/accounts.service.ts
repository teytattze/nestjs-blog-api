import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { hashString } from 'src/utils/hash.util';
import { SessionsRepository } from '../auth/sessions/sessions.repository';
import { MailService } from '../mail/mail.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import { accountErrors } from './accounts.error';
import { AccountsRepository } from './accounts.repository';

@Injectable()
export class AccountsService {
  constructor(
    private readonly mailService: MailService,
    private readonly accountsRepository: AccountsRepository,
    private readonly sessionsRepository: SessionsRepository,
  ) {}

  async getAllAccounts() {
    const accounts = await this.accountsRepository.getAllAccounts();
    if (accounts) {
      return accounts;
    }
    throw new NotFoundException(accountErrors.NOT_FOUND);
  }

  async getAccountById(id: string) {
    const account = await this.accountsRepository.getAccountById(id);
    if (account) {
      return account;
    }
    throw new NotFoundException(accountErrors.NOT_FOUND);
  }

  async registerAccount(data: RegisterAccountDto) {
    const hasUsername = await this.checkDuplication(data.username, 'username');
    if (!hasUsername) {
      throw new BadRequestException(accountErrors.DUPLICATE_USERNAME);
    }

    const hasEmail = await this.checkDuplication(data.email, 'email');
    if (!hasEmail) {
      throw new BadRequestException(accountErrors.DUPLICATE_EMAIL);
    }

    const hashedPassword = await hashString(data.password);
    const session = await this.sessionsRepository.registerSession();
    const account = await this.accountsRepository.registerAccount(
      { ...data, password: hashedPassword },
      session,
    );
    if (account) {
      await this.mailService.sendEmailVerification({
        id: account.id,
        username: account.username,
        email: account.email,
      });
      return { ...account };
    }
    throw new BadRequestException(accountErrors.CREATE_FAIL);
  }

  async deleteAccountById(id: string) {
    const result = await this.accountsRepository.deleteAccountById(id);
    if (result.affected === 0) {
      throw new BadRequestException(accountErrors.DELETE_FAIL);
    }
    return { message: `User ${id} deleted successfully` };
  }

  private async checkDuplication(value: string, type: 'username' | 'email') {
    const account = await this.accountsRepository.getSingleAccount({
      where: { [type]: value },
    });
    if (!account) {
      return true;
    }
    return false;
  }
}
