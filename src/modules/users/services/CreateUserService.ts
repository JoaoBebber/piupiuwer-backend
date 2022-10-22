import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
// import path from 'path';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  about?: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute({
    first_name, last_name, email, username, password, about,
  }: IRequest): Promise<User> {
    const emailAlreadyExists = await this.usersRepository.findBy({
      key: 'email',
      value: email,
    });

    const usernameAlreadyExists = await this.usersRepository.findBy({
      key: 'username',
      value: username,
    });

    if (emailAlreadyExists || usernameAlreadyExists) {
      throw new AppError('User with same email or username already exists.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create(about ? {
      first_name,
      last_name,
      email: email.toLowerCase(),
      username,
      password: hashedPassword,
      about,
    } : {
      first_name,
      last_name,
      email: email.toLowerCase(),
      username,
      password: hashedPassword,
    });

    // const templateDataFile = path.resolve(__dirname, '..', 'views', 'create_account.hbs');

    // const name = first_name + last_name;

    // await this.mailProvider.sendMail({
    //   to: {
    //     name,
    //     email,
    //   },
    //   subject: 'Criação de conta',
    //   templateData: {
    //     file: templateDataFile,
    //     variables: { name },
    //   },
    // });

    return user;
  }
}
