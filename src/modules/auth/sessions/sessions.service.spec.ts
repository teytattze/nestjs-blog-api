import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from 'src/common/config/config.service';
import { mockConfigService } from 'src/__mocks__/config.mock';
import {
  mockSessions,
  mockSessionsRepository,
  MOCK_NEW_EXPIRES,
  MOCK_NEW_REFRESH_TOKEN,
  MOCK_REFRESH_TOKEN,
} from 'src/__mocks__/sessions.mock';
import { SessionsRepository } from './sessions.repository';
import { SessionsService } from './sessions.service';

describe('Sessions Service', () => {
  let service: SessionsService;

  const mockProviders = [
    {
      provide: ConfigService,
      useValue: mockConfigService,
    },
    {
      provide: SessionsRepository,
      useValue: mockSessionsRepository,
    },
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionsService, ...mockProviders],
    }).compile();
    service = module.get<SessionsService>(SessionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSessionToken', () => {
    it('Should return session token', async () => {
      const result = await service.getSessionToken(mockSessions[0]);
      expect(result).toBe(MOCK_REFRESH_TOKEN);
    });

    it('Should return new session token when token is null', async () => {
      mockSessionsRepository.updateSessionById.mockResolvedValue({
        token: MOCK_NEW_REFRESH_TOKEN,
        expires: MOCK_NEW_EXPIRES,
      });
      jest
        .spyOn(service as any, 'generateSessionToken')
        .mockResolvedValue(MOCK_NEW_REFRESH_TOKEN);

      const result = await service.getSessionToken(mockSessions[1]);
      expect(result).toBe(MOCK_NEW_REFRESH_TOKEN);
    });

    it('Should return new session token when token expired', async () => {
      mockSessionsRepository.updateSessionById.mockResolvedValue({
        token: MOCK_NEW_REFRESH_TOKEN,
        expires: MOCK_NEW_EXPIRES,
      });
      jest
        .spyOn(service as any, 'generateSessionToken')
        .mockResolvedValue(MOCK_NEW_REFRESH_TOKEN);

      const result = await service.getSessionToken(mockSessions[2]);
      expect(result).toBe(MOCK_NEW_REFRESH_TOKEN);
    });
  });

  describe('invalidateSession', () => {
    it('Should return invalid session', async () => {
      mockSessionsRepository.updateSessionById.mockResolvedValue({
        ...mockSessions[0],
        token: null,
        expires: null,
      });
      const result = await service.invalidateSession(mockSessions[0].id);
      expect(result).toBeDefined();
    });

    it('Should throw bad request exception', async () => {
      mockSessionsRepository.updateSessionById.mockResolvedValue(null);
      await expect(
        service.invalidateSession(mockSessions[0].id),
      ).rejects.toEqual(new BadRequestException());
    });
  });
});
