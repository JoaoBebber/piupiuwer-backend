interface IParseMailTemplateDTO {
  file: string;
  variables: {
    [keys: string]: string | number;
  }
}

export default IParseMailTemplateDTO;
