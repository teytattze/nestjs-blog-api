import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from 'src/common/config/config.service';
import { mockConfigService } from 'src/__mocks__/config.mock';
import {
  mockJwtUser,
  MOCK_EXPIRED_JWT_TOKEN,
  MOCK_INVALID_JWT_TOKEN,
} from 'src/__mocks__/jwt.mock';
import { jwtErrors } from './jwt.error';
import { IJwtUser } from './jwt.interface';
import { JwtService } from './jwt.service';

describe('JwtService', () => {
  let service: JwtService;

  const mockProviders = [
    {
      provide: ConfigService,
      useValue: mockConfigService,
    },
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtService, ...mockProviders],
    }).compile();
    service = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateJwtToken', () => {
    it('Should return jwt token', async () => {
      const jwtToken = await service.generateJwtToken(mockJwtUser);
      expect(jwtToken).toBeDefined();
    });
  });

  describe('verifyJwtToken', () => {
    it('Should return jwt payload', async () => {
      const jwtToken = await service.generateJwtToken(mockJwtUser);
      const payload = await service.verifyJwtToken(jwtToken);
      expect(payload).toBeDefined();
      expect(payload.exp).toBeDefined();
      expect(payload.user).toMatchObject<IJwtUser>(mockJwtUser);
    });

    it('Should throw jwt token expired', async () => {
      await expect(
        await service.verifyJwtToken(MOCK_EXPIRED_JWT_TOKEN),
      ).rejects.toEqual(new UnauthorizedException(jwtErrors.EXPIRED));
    });

    it('Should throw jwt token invalid', async () => {
      await expect(
        await service.verifyJwtToken(MOCK_INVALID_JWT_TOKEN),
      ).rejects.toEqual(new UnauthorizedException(jwtErrors.INVALID));
    });
  });

  // describe('refreshJwks', () => {});
});
