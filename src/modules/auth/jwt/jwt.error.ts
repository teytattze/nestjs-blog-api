import { HttpStatus } from '@nestjs/common';
import { JwtErrorCode, jwtErrorMessages } from 'src/errors';

export const jwtErrors = {
  EXPIRED: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: JwtErrorCode.EXPIRED,
    message: jwtErrorMessages[JwtErrorCode.EXPIRED],
  },
  INVALID: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: JwtErrorCode.INVALID,
    message: jwtErrorMessages[JwtErrorCode.INVALID],
  },
};
