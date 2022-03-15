import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from 'src/common/config/config.service';
import { AppModule } from './app.module';
import { initSwagger } from './lib/swagger-init';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const GLOBAL_PREFIX = 'api';

  // Middlewares
  app.use(cookieParser());
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      transformOptions: { enableImplicitConversion: true },
      transform: true,
    }),
  );

  initSwagger(app);

  // Get host and port from config
  const configService = app.get(ConfigService);
  const HOST = configService.get('server.host');
  const PORT = configService.get('server.port');

  // Listen to port
  await app.listen(PORT, () => {
    Logger.log(`Listening at http://${HOST}:${PORT}/${GLOBAL_PREFIX}`);
  });

  // Webpack hot reload
  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
}

bootstrap();
