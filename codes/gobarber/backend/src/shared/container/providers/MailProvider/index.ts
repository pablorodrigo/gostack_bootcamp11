import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import SESlMailProvider from '@shared/container/providers/MailProvider/implementations/SESlMailProvider';
import { container } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import mailConfig from '@config/mail';

const mailProviders = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESlMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProviders[mailConfig.driver],
);
