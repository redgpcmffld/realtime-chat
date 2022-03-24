import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as config from 'config';

class SendEmail {
  mailConfig: SMTPTransport.Options;
  mailer: nodemailer.Transporter;

  constructor() {
    this.mailConfig = this._setConfig();
    this._setMailer(this.mailConfig);
  }

  private _setMailer(mailConfig: SMTPTransport.Options) {
    this.mailer = nodemailer.createTransport(mailConfig);
  }

  private _setConfig() {
    return config.get('mail');
  }

  async sendEmail(sendOption: nodemailer.SendMailOptions): Promise<any> {
    sendOption['from'] = this.mailConfig.auth.user;
    return await this.mailer.sendMail(sendOption);
  }
}
const send_email: SendEmail = new SendEmail();

export = send_email;
