import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_MODULE_OPTIONS } from './config.const';
import { IConfigModuleOptions } from './config.interface';
import { ConfigService } from './config.service';

@Global()
@Module({})
export class ConfigModule {
  static register(options: IConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_MODULE_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
