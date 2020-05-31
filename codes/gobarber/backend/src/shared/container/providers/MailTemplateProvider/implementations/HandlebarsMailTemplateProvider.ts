import handlebars from 'handlebars';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IParseEmailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseEmailTemplateDTO';
import * as fs from 'fs';

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  async parse({
    variables,
    file_template,
  }: IParseEmailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file_template, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
