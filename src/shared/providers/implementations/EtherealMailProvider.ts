import { IMailProvider } from '../IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';

export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      this.client = transporter;
    }).catch(err => console.error(err));
  }

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    console.log('inside ethereal');

    const message = await this.client.sendMail({
      to,
      from: 'LLS <noreply@lls.com.br',
      subject,
      text: body,
      html: body,
    });

    console.log('Message sent to: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}