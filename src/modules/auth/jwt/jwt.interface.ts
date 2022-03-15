import { ModuleMetadata, Type } from '@nestjs/common';
import { JWTPayload } from 'jose/types';
import { AccountRole } from 'src/modules/accounts/accounts.enum';

export interface IJwtModuleConfigOptions {
  jwkFilepath: string;
}

export interface IJwtModuleConfigAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<IJwtModuleConfigOptions>;
  useClass?: Type<IJwtModuleConfigOptions>;
  useFactory?: (
    ...args: any[]
  ) => Promise<IJwtModuleConfigOptions> | IJwtModuleConfigOptions;
}

export interface IJwtUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: AccountRole;
  verified: boolean;
}

export interface IJwtPayload extends JWTPayload {
  user: IJwtUser;
}
