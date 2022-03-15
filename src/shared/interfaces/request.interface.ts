import { Request } from 'express';
import { IJwtUser } from 'src/modules/auth/jwt/jwt.interface';

export interface RequestWithUser extends Request {
  user?: IJwtUser;
}
