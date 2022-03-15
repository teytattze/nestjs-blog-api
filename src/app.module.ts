import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from './common/config/config.module';
import { DatabaseModule } from './common/database/database.module';
import { HttpLoggerMiddleware } from './common/middlewares/http-logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PostsModule } from './modules/posts/posts.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { CONFIG_FILEPATH } from './common/config/config.const';

@Module({
  imports: [
    AuthModule,
    ConfigModule.register({ filepath: CONFIG_FILEPATH }),
    DatabaseModule,
    MailModule,
    PaymentsModule,
    PostsModule,
    AccountsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
