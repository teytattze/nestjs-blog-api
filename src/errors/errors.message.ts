import { JwtErrorCode } from '.';
import { PostErrorCode, AccountErrorCode } from './errors.code';

export const postErrorMessages: Record<PostErrorCode, string> = {
  2000: 'Cannot find the post',
  2001: 'Failed to create the post',
  2002: 'Failed to update the post',
  2003: 'Failed to delete the post',
  2004: 'Failed to create duplicated post',
};

export const accountErrorMessages: Record<AccountErrorCode, string> = {
  1000: 'Cannot find the user',
  1001: 'Failed to create the user',
  1002: 'Failed to update the user',
  1003: 'Failed to delete the user',
  1004: 'Failed to create duplicated username',
  1005: 'Failed to create duplicated email',
};

export const jwtErrorMessages: Record<JwtErrorCode, string> = {
  200: 'Unauthorized',
  201: 'Unauthorized',
};
