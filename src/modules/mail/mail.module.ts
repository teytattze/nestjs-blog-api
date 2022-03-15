import { Module } from '@nestjs/common';
import { MailHelper } from './mail.helper';
import { MailService } from './mail.service';

@Module({
  providers: [MailService, MailHelper],
  exports: [MailService, MailHelper],
})
export class MailModule {}
