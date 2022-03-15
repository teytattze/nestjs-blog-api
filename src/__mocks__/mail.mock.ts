export const mockMailHelper = {
  getRedirectUrlHost: jest.fn(),
  sendMail: jest.fn(),
  createTransport: jest.fn(),
};

export const mockMailService = {
  sendEmailVerification: jest.fn(),
  sendPasswordRecoveryVerification: jest.fn(),
};
