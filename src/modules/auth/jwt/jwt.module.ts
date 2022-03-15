import { DynamicModule, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JWT_MODULE_CONFIG_OPTIONS } from './jwt.const';
import { IJwtModuleConfigOptions } from './jwt.interface';

@Module({})
export class JwtModule {
  static register(options: IJwtModuleConfigOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        JwtService,
        {
          provide: JWT_MODULE_CONFIG_OPTIONS,
          useValue: options,
        },
      ],
      exports: [JwtService],
    };
  }
}
