import * as Joi from 'joi';

const serverValidationSchema = Joi.object({
  host: Joi.string().required(),
  port: Joi.number().required(),
  secure: Joi.boolean().required(),
});

const databaseValidationSchema = Joi.object({
  host: Joi.string().required(),
  port: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  database: Joi.string().required(),
});

const redisValidationSchema = Joi.object({
  host: Joi.string().required(),
  port: Joi.number().required(),
});

const jwtValidationSchema = Joi.object({
  alg: Joi.string().valid('RS256').required(),
  ttl: Joi.number().required(),
  filename: Joi.string().required(),
});

const sessionValidationSchema = Joi.object({
  bytes: Joi.number().required(),
  ttl: Joi.number().required(),
});

const nodemailerValidationSchema = Joi.object({
  mail: Joi.string().email().required(),
  user: Joi.string().required(),
});

const googleapisValidationSchema = Joi.object({
  redirectUrl: Joi.string().required(),
  client: Joi.string().required(),
  secret: Joi.string().required(),
  refreshToken: Joi.string().required(),
});

export const baseValidationSchema = Joi.object({
  server: serverValidationSchema,
  database: databaseValidationSchema,
  redis: redisValidationSchema,
  jwt: jwtValidationSchema,
  session: sessionValidationSchema,
  nodemailer: nodemailerValidationSchema,
  googleapis: googleapisValidationSchema,
});

export const validate = (config: any) => {
  const result = baseValidationSchema.validate(config);
  if (result.error?.message) {
    const err = result.error.message;
    throw new Error(err);
  }
  return result.value;
};
