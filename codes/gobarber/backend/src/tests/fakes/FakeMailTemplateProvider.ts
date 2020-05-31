import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IParseEmailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseEmailTemplateDTO';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  async parse(parse: IParseEmailTemplateDTO): Promise<string> {
    return parse.template;
  }
}
