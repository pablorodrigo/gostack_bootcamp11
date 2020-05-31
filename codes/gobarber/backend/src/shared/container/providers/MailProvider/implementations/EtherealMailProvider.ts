import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass, // generated ethereal password
        },
      });
      this.client = transporter;
    });
  }

  async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: '"Equipe GoBarber 👻" <equiep@gobarber.com>', // sender address
      to, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: body, // plain text body
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
