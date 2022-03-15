import { IBaseConfig } from 'src/common/config/config.interface';

export const mockConfig: IBaseConfig = {
  server: {
    host: 'localhost',
    port: 8000,
    secure: false,
  },
  database: {
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: 'password',
    database: 'blog_db',
  },
  redis: {
    host: 'localhost',
    port: 6379,
  },
  jwt: {
    alg: 'RS256',
    ttl: 900,
    filename: 'secret.json',
  },
  session: {
    bytes: 512,
    ttl: 2592000,
  },
  nodemailer: {
    mail: 'tattze.tey@tatsmartdev.com',
    user: 'tatSmartDev',
  },
  googleapis: {
    redirectUrl: 'https://developers.google.com/oauthplayground',
    client:
      '132265668864-db5sjg76b8p3299u69v7pfsr3hqlmhl0.apps.googleusercontent.com',
    secret: '05otBhdgHKhXglGtRXP6dz3D',
    refreshToken:
      '1//04i7hx84R6Jr8CgYIARAAGAQSNwF-L9Ir71YbLFrO2hAKFILIAxdgWaJmLwgYUek8u1EhdEaNLi01_WB5sJ-pXyvQD_1R_YJC4Uw',
  },
};

export const mockConfigService = {
  get: jest.fn().mockReturnValue(mockConfig),
};
