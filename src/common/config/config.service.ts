import { Inject, Injectable } from '@nestjs/common';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { objectMapping } from 'src/utils/object-mapping.util';
import { validate } from './config.validation';
import { CONFIG_MODULE_OPTIONS } from './config.const';
import { IConfigModuleOptions } from './config.interface';

@Injectable()
export class ConfigService {
  private config: Record<string, any>;

  constructor(@Inject(CONFIG_MODULE_OPTIONS) options: IConfigModuleOptions) {
    this.initConfig(options.filepath);
  }

  get<T = any>(key?: string): T | Record<string, any> {
    if (key === undefined) return this.config;
    return objectMapping<T>(key, this.config);
  }

  private initConfig(filepath: string) {
    const config = yaml.load(readFileSync(filepath, 'utf-8')) as Record<
      string,
      any
    >;
    this.config = validate(config);
  }
}
