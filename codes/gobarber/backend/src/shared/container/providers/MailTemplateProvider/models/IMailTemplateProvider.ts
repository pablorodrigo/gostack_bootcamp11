import IParseEmailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseEmailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(parse: IParseEmailTemplateDTO): Promise<string>;
}
