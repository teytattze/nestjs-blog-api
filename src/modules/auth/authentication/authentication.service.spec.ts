import { Test, TestingModule } from '@nestjs/testing';
import { AccountRole } from 'src/modules/accounts/accounts.enum';
import { AccountsRepository } from '../../accounts/accounts.repository';
import { JwtService } from '../jwt/jwt.service';
import { SessionsService } from '../sessions/sessions.service';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';

describe('Authentication Service', () => {
  let service: AuthenticationService;

  const mockJwtService = {
    generateJwtToken: jest.fn(),
  };
  const mockSessionsService = {
    getSessionToken: jest.fn(),
    generateSessionToken: jest.fn(),
  };
  const mockAccountsRepository = {
    getSingleAccount: jest.fn(),
  };

  const mockProviders = [
    {
      provide: JwtService,
      useValue: mockJwtService,
    },
    {
      provide: SessionsService,
      useValue: mockSessionsService,
    },
    {
      provide: AccountsRepository,
      useValue: mockAccountsRepository,
    },
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService, ...mockProviders],
    }).compile();
    service = module.get<AuthenticationService>(AuthenticationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    const loginData: LoginDto = {
      email: 'tattzetey@gmail.com',
      password: '1234567890',
    };
    const accessToken = 'accessToken';
    const refreshToken = 'refreshToken';

    const user = {
      id: '53fcd29c-e4ad-42bf-9bfd-e44079c74c91',
      firstName: 'Tat Tze',
      lastName: 'Tey',
      username: 'tattzetey',
      email: 'tattzetey@gmail.com',
      password: '$2a$10$226Oq2weHIsDMkq0AZO/o.6A9tJ17X2wU7EHeoclKzRfjHAL2b52y',
      role: AccountRole.MEMBER,
      verified: false,
      posts: [],
      session: {
        id: 'ad76cad8-d9a7-404c-926c-db582fce4bd9',
        token: null,
        expires: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const jwtUser = {
      id: '53fcd29c-e4ad-42bf-9bfd-e44079c74c91',
      firstName: 'Tat Tze',
      lastName: 'Tey',
      username: 'tattzetey',
      email: 'tattzetey@gmail.com',
      role: AccountRole.MEMBER,
      verified: false,
    };

    it('should login successfully', async () => {
      mockJwtService.generateJwtToken.mockResolvedValue(accessToken);
      mockSessionsService.getSessionToken.mockResolvedValue(refreshToken);
      mockAccountsRepository.getSingleAccount.mockResolvedValue(user);

      const result = await service.login(loginData);

      expect(result).toEqual({
        accessToken,
        refreshToken,
        jwtUser,
      });
    });
  });
});
