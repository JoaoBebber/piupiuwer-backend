import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.list();

    const usersWithoutPassword: Omit<User, 'password'>[] = [];

    users.forEach((user) => {
      const { password: _, ...userWithoutPassword } = user;

      usersWithoutPassword.push(userWithoutPassword);
    });

    return usersWithoutPassword;
  }
}

export default ListUsersService;
