export interface IConfigModuleOptions {
  filepath: string;
}

export interface IServerConfig {
  host: string;
  port: number;
  secure: boolean;
}

export interface IDatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export interface IRedisConfig {
  host: string;
  port: number;
}

export interface IJwtConfig {
  alg: 'RS256';
  ttl: number;
  filename: string;
}

export interface ISessionConfig {
  bytes: number;
  ttl: number;
}

export interface INodemailerConfig {
  mail: string;
  user: string;
}

export interface IGoogleapisConfig {
  redirectUrl: string;
  client: string;
  secret: string;
  refreshToken: string;
}

export interface IBaseConfig {
  server: IServerConfig;
  database: IDatabaseConfig;
  redis: IRedisConfig;
  jwt: IJwtConfig;
  session: ISessionConfig;
  nodemailer: INodemailerConfig;
  googleapis: IGoogleapisConfig;
}
