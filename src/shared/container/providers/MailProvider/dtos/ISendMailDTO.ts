import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IContact {
  name: string;
  email: string;
}

interface ISendMailDTO {
  to: IContact;
  from?: IContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}

export default ISendMailDTO;
