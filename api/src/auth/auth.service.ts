import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { SendMailOptions } from 'nodemailer';
import { Logger } from '@nestjs/common';
import { RedisClient } from 'src/utils/redis-client';
import * as sendEmail from '../utils/send-email';
import { RequestCertForm } from './pipes/request-cert.pipe';

@Injectable()
export class AuthService {
  redisClient: RedisClient;

  constructor() {
    this.redisClient = new RedisClient();
  }
  async sendCert(reqeustCertForm: RequestCertForm): Promise<void> {
    try {
      const cert: number = Math.floor(Math.random() * (100000 - 1) + 1);
      const { email } = reqeustCertForm;
      const emailOptions: SendMailOptions = {
        to: email,
        subject: '테스트 인증번호 메일',
        html: `
        <p>인증번호</p>
        <br>
        <p>${cert}</p>
      `,
      };

      await this.redisClient.set(email, cert).then(() => {
        try {
          sendEmail.sendEmail(emailOptions);
        } catch (error) {
          Logger.error(error);
        }
      });
    } catch (error) {
      Logger.error(error);
    }
  }
  async certConfirm(email: string, cert: number): Promise<{ result: boolean }> {
    try {
      const value = await this.redisClient.get(email);
      if (value.err) {
        throw new NotFoundException('this account info not found');
      }
      if (value !== cert) {
        throw new UnauthorizedException('invalid cert number');
      }
      return { result: true };
    } catch (error) {
      throw error;
    }
  }
}
