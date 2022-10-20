interface ICreateUserDTO {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  about?: string;
}

export default ICreateUserDTO;
