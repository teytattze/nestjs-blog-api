import { Injectable } from '@nestjs/common';
import { google, GoogleApis } from 'googleapis';
import * as nodemailer from 'nodemailer';
import type { SendMailOptions } from 'nodemailer';
import * as path from 'path';
import { ConfigService } from 'src/common/config/config.service';
import {
  IGoogleapisConfig,
  IServerConfig,
} from 'src/common/config/config.interface';

const hbs = require('nodemailer-express-handlebars');

@Injectable()
export class MailHelper {
  private OAuth2: GoogleApis['auth']['OAuth2'];
  private host: string;
  private secure: boolean;
  private googleRedirectUrl: string;
  private googleClient: string;
  private googleSecret: string;
  private googleRefreshToken: string;

  constructor(private readonly configService: ConfigService) {
    this.OAuth2 = google.auth.OAuth2;
    const serverConfig = this.configService.get<IServerConfig>('server');
    const googleapisConfig =
      this.configService.get<IGoogleapisConfig>('googleapis');

    this.host = serverConfig.host;
    this.secure = serverConfig.secure;
    this.googleRedirectUrl = googleapisConfig.redirectUrl;
    this.googleClient = googleapisConfig.client;
    this.googleSecret = googleapisConfig.secret;
    this.googleRefreshToken = googleapisConfig.refreshToken;
  }

  getRedirectUrlHost() {
    if (this.secure) {
      return `https://${this.host}`;
    } else {
      return `http://${this.host}`;
    }
  }

  async sendMail(options: SendMailOptions) {
    try {
      const transporter = await this.createTransport();
      transporter.use(
        'compile',
        hbs({
          viewEngine: {
            extName: '.hbs',
            partialsDir: path.resolve(__dirname, 'templates'),
            defaultLayout: false,
          },
          viewPath: path.resolve(__dirname, 'templates'),
          extName: '.hbs',
        }),
      );
      return await transporter.sendMail({ ...options });
    } catch (err) {
      console.log(err);
    }
  }

  private async createTransport() {
    const oauth2Client = new this.OAuth2(
      this.googleClient,
      this.googleSecret,
      this.googleRedirectUrl,
    );

    oauth2Client.setCredentials({
      refresh_token: this.googleRefreshToken,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.NODEMAILER_MAIL,
        clientId: process.env.GOOGLE_CLIENT,
        clientSecret: process.env.GOOGLE_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken as string,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
}
