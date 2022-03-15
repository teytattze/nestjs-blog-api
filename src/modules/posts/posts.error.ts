import { HttpStatus } from '@nestjs/common';
import { PostErrorCode, postErrorMessages } from 'src/errors';

export const postErrors = {
  NOT_FOUND: {
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: PostErrorCode.NOT_FOUND,
    message: postErrorMessages[PostErrorCode.NOT_FOUND],
  },
  CREATE_FAIL: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: PostErrorCode.CREATE_FAIL,
    message: postErrorMessages[PostErrorCode.CREATE_FAIL],
  },
  UPDATE_FAIL: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: PostErrorCode.UPDATE_FAIL,
    message: postErrorMessages[PostErrorCode.UPDATE_FAIL],
  },
  DELETE_FAIL: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: PostErrorCode.DELETE_FAIL,
    message: postErrorMessages[PostErrorCode.DELETE_FAIL],
  },
  DUPLICATE_FAIL: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: PostErrorCode.DUPLICATE_FAIL,
    message: postErrorMessages[PostErrorCode.DUPLICATE_FAIL],
  },
};
