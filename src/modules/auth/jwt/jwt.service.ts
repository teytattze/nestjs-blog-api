import { Inject, Injectable } from '@nestjs/common';
import { writeFile } from 'src/utils/write-file.util';
import { fromKeyLike } from 'jose/jwk/from_key_like';
import { parseJwk } from 'jose/jwk/parse';
import { SignJWT } from 'jose/jwt/sign';
import { jwtVerify } from 'jose/jwt/verify';
import { decodeProtectedHeader } from 'jose/util/decode_protected_header';
import { generateKeyPair } from 'jose/util/generate_key_pair';
import {
  JWT_MODULE_CONFIG_OPTIONS,
  JWT_VERIFICATION_EXPIRED,
  PRIVATE_JWK,
  PUBLIC_JWK,
} from './jwt.const';
import { readFile } from 'src/utils/read-file.util';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from 'src/common/config/config.service';
import { IJwtConfig } from 'src/common/config/config.interface';
import {
  IJwtModuleConfigOptions,
  IJwtPayload,
  IJwtUser,
} from './jwt.interface';
import { getExpiresTime } from '../auth.helper';
import { jwtErrors } from './jwt.error';

@Injectable()
export class JwtService {
  private jwks: Record<string, any>;
  private alg: 'RS256';
  private ttl: number;
  private jwksFilepath: string;

  constructor(
    @Inject(JWT_MODULE_CONFIG_OPTIONS) options: IJwtModuleConfigOptions,
    private readonly configService: ConfigService,
  ) {
    const jwtConfig = this.configService.get<IJwtConfig>('jwt');

    this.alg = jwtConfig.alg;
    this.ttl = jwtConfig.ttl;
    this.jwksFilepath = options.jwkFilepath;

    this.loadJwks();
  }

  async generateJwtToken(payload: IJwtUser) {
    const expires = getExpiresTime(this.ttl);
    const kid = Math.floor(Math.random() * 10 + 1).toString();

    const privateJwk = this.jwks[kid][PRIVATE_JWK];
    const privateKey = await parseJwk({ ...privateJwk, alg: this.alg });

    const jwtToken = await new SignJWT({ user: payload })
      .setProtectedHeader({ alg: this.alg, kid })
      .setExpirationTime(expires)
      .sign(privateKey);

    return jwtToken;
  }

  async verifyJwtToken(token: string): Promise<IJwtPayload> {
    try {
      const { alg, kid } = await decodeProtectedHeader(token);

      const publicJwk = this.jwks[kid][PUBLIC_JWK];
      const publicKey = await parseJwk({ ...publicJwk, alg });

      const { payload } = await jwtVerify(token, publicKey);

      return payload as IJwtPayload;
    } catch (err) {
      if (err.code === JWT_VERIFICATION_EXPIRED) {
        throw new UnauthorizedException(jwtErrors.EXPIRED);
      } else {
        throw new UnauthorizedException(jwtErrors.INVALID);
      }
    }
  }

  async refreshJwks() {
    const { publicKey, privateKey } = await generateKeyPair(this.alg);

    const publicJwk = await fromKeyLike(publicKey);
    const privateJwk = await fromKeyLike(privateKey);

    const jwks = {};
    for (let i = 1; i <= 10; i++) {
      jwks[i] = { publicJwk, privateJwk };
    }

    const jwksString = JSON.stringify(jwks);
    const writeSuccess = writeFile(jwksString, this.jwksFilepath);

    if (writeSuccess) {
      this.loadJwks();
      return { message: 'Key pair rotation successfully' };
    }
    return { message: 'Key pair rotation failed' };
  }

  private loadJwks() {
    const jwks = readFile(this.jwksFilepath);
    this.jwks = JSON.parse(jwks);
  }
}
