import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

interface IMailTemplateProvider {
  parse({ file, variables }: IParseMailTemplateDTO): Promise<string>;
}

export default IMailTemplateProvider;
