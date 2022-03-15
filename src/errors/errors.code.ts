export enum MySqlErrorCode {
  DUPLICATE = 1062,
}

export enum AuthErrorCode {
  UNAUTHORIZE = 100,
}

export enum JwtErrorCode {
  INVALID = 200,
  EXPIRED = 201,
}

export enum SessionErrorCode {
  SESSION_INVALID = 300,
  SESSION_EXPIRED = 301,
}

export enum AccountErrorCode {
  NOT_FOUND = 1000,
  CREATE_FAIL = 1001,
  UPDATE_FAIL = 1002,
  DELETE_FAIL = 1003,
  DUPLICATE_USERNAME = 1004,
  DUPLICATE_EMAIL = 1005,
}

export enum PostErrorCode {
  NOT_FOUND = 2000,
  CREATE_FAIL = 2001,
  UPDATE_FAIL = 2002,
  DELETE_FAIL = 2003,
  DUPLICATE_FAIL = 2004,
}
