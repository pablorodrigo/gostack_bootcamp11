interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseEmailTemplateDTO {
  file_template: string;
  variables: ITemplateVariables;
}
