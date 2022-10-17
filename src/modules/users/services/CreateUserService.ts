import { inject, injectable } from 'tsyringe';
import path from 'path';

import { Users } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  first_name: string;
  last_name: string;
  email: string;
  about: string;
  password: string;
  username: string;
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
    first_name, last_name, email, about, password, username,
  }: IRequest): Promise<Users> {
    const userAlreadyExists = await this.usersRepository.findByEmailOrUsername(email, username);

    if (userAlreadyExists) throw new AppError('User with same email or username already exists');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      about,
      password: hashedPassword,
      username,
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
