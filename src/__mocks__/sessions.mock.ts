import { Session } from 'src/modules/auth/sessions/sessions.entity';

export const MOCK_REFRESH_TOKEN = 'MOCK_REFRESH_TOKEN';
export const MOCK_NEW_REFRESH_TOKEN = 'MOCK_NEW_REFRESH_TOKEN';
export const MOCK_NEW_EXPIRES = '32526556598';

export const mockSessionsRepository = {
  registerSession: jest.fn(),
  getSessionById: jest.fn(),
  updateSessionById: jest.fn(),
};

export const mockSessionsService = {
  getSessionToken: jest.fn(),
  invalidateSession: jest.fn(),
  generateSessionToken: jest.fn(),
};

export const mockSessions: Session[] = [
  {
    id: 'f2a1d020-8c72-4a2d-ac4e-b698ff1b715d',
    token: MOCK_REFRESH_TOKEN,
    expires: '32526556598',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '97ca77ad-9240-4d30-b338-bdea4dde41cc',
    token: null,
    expires: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7df64da4-1190-4ecb-8161-7574b90adb6a',
    token: MOCK_REFRESH_TOKEN,
    expires: '938025398',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
