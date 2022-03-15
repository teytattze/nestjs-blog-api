import { HttpStatus } from '@nestjs/common';
import { AccountErrorCode, accountErrorMessages } from 'src/errors';

export const accountErrors = {
  NOT_FOUND: {
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: AccountErrorCode.NOT_FOUND,
    message: accountErrorMessages[AccountErrorCode.NOT_FOUND],
  },
  CREATE_FAIL: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: AccountErrorCode.CREATE_FAIL,
    message: accountErrorMessages[AccountErrorCode.CREATE_FAIL],
  },
  UPDATE_FAIL: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: AccountErrorCode.UPDATE_FAIL,
    message: accountErrorMessages[AccountErrorCode.UPDATE_FAIL],
  },
  DELETE_FAIL: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: AccountErrorCode.DELETE_FAIL,
    message: accountErrorMessages[AccountErrorCode.DELETE_FAIL],
  },
  DUPLICATE_USERNAME: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: AccountErrorCode.DUPLICATE_USERNAME,
    message: accountErrorMessages[AccountErrorCode.DUPLICATE_USERNAME],
  },
  DUPLICATE_EMAIL: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: AccountErrorCode.DUPLICATE_EMAIL,
    message: accountErrorMessages[AccountErrorCode.DUPLICATE_EMAIL],
  },
};
