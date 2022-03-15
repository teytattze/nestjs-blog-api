import { Account } from 'src/modules/accounts/accounts.entity';
import { AccountRole } from 'src/modules/accounts/accounts.enum';

export const mockAccounts: Account[] = [
  {
    id: '621060cf-d29a-4e21-b293-5ca84a3a8857',
    firstName: 'Tat Tze',
    lastName: 'Tey',
    username: 'teytattze',
    email: 'tattzetey@gmail.com',
    password: '$2a$10$/vR9fzGZ/5Wq1A7yUFVPBOKPTPNEt3ziCTLCQHchi627xQ51dUYC6',
    role: AccountRole.MEMBER,
    verified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2adf0fb6-6aa8-403e-9a8b-8d7cd4e154ad',
    firstName: 'Nicolas',
    lastName: 'Chia',
    username: 'nicholaschia',
    email: 'nicholas@gmail.com',
    password: '$2a$10$/vR9fzGZ/5Wq1A7yUFVPBOKPTPNEt3ziCTLCQHchi627xQ51dUYC6',
    role: AccountRole.MEMBER,
    verified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'c07c6d45-e31e-4e88-99cd-3af8f50b7c37',
    firstName: 'Livia',
    lastName: 'Tan',
    username: 'livia',
    email: 'livia@outlook.com',
    password: '$2a$10$/vR9fzGZ/5Wq1A7yUFVPBOKPTPNEt3ziCTLCQHchi627xQ51dUYC6',
    role: AccountRole.MEMBER,
    verified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockAccountsService = {
  getAllAccounts: jest.fn(),
  getAccountById: jest.fn(),
  deleteAccountById: jest.fn(),
  registerAccount: jest.fn(),
  checkDuplication: jest.fn(),
};

export const mockAccountRepository = {
  getAllAccounts: jest.fn(),
  getAccountById: jest.fn(),
};
