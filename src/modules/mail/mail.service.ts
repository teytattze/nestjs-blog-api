import { Injectable } from '@nestjs/common';
import { INodemailerConfig } from 'src/common/config/config.interface';
import { ConfigService } from 'src/common/config/config.service';
import { MailHelper } from './mail.helper';

@Injectable()
export class MailService {
  private senderEmail: string;
  private senderName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly mailHelper: MailHelper,
  ) {
    const nodemailerConfig =
      this.configService.get<INodemailerConfig>('nodemailer');
    this.senderEmail = nodemailerConfig.mail;
    this.senderName = nodemailerConfig.user;
  }

  async sendEmailVerification({
    id,
    username,
    email,
  }: {
    id: string;
    username: string;
    email: string;
  }) {
    const redirectUrl = `${this.mailHelper.getRedirectUrlHost()}/user/email-verification?id=${id}`;
    const template = {
      from: `\"${this.senderName}\" <${this.senderEmail}>`,
      to: email,
      subject: 'Email Verification',
      template: 'email-verification',
      context: {
        id,
        username,
        redirectUrl,
      },
    };
    return await this.mailHelper.sendMail(template);
  }

  async sendPasswordRecoveryVerification({
    id,
    username,
    email,
  }: {
    id: string;
    username: string;
    email: string;
  }) {
    const redirectUrl = `${this.mailHelper.getRedirectUrlHost()}/user/password-recovery?id=${id}`;
    const template = {
      from: `\"${this.senderName}\" <${this.senderEmail}>`,
      to: email,
      subject: 'Password Recovery Verification',
      template: 'password-recovery',
      context: {
        id,
        username,
        redirectUrl,
      },
    };
    return await this.mailHelper.sendMail(template);
  }
}
