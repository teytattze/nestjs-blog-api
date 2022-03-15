import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  mockAccountRepository,
  mockAccounts,
} from 'src/__mocks__/accounts.mock';
import { mockMailService } from 'src/__mocks__/mail.mock';
import { MailService } from '../mail/mail.service';
import { Account } from './accounts.entity';
import { accountErrors } from './accounts.error';
import { AccountsRepository } from './accounts.repository';
import { AccountsService } from './accounts.service';

describe('Accounts Service', () => {
  let service: AccountsService;
  const mockProviders = [
    {
      provide: AccountsRepository,
      useValue: mockAccountRepository,
    },
    {
      provide: MailService,
      useValue: mockMailService,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsService, ...mockProviders],
    }).compile();
    service = module.get<AccountsService>(AccountsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllAccounts', () => {
    it('should return all accounts', async () => {
      mockAccountRepository.getAllAccounts.mockResolvedValue(mockAccounts);
      const result = await service.getAllAccounts();
      expect(result).toMatchObject<Account[]>(mockAccounts);
    });

    it('should throw not found', async () => {
      mockAccountRepository.getAllAccounts.mockResolvedValue(undefined);
      const result = await service.getAllAccounts();
      expect(result).toThrow(new NotFoundException(accountErrors.NOT_FOUND));
    });
  });
});
