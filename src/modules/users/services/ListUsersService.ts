import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(username: string): Promise<Omit<User, 'password'>[]> {
    if (username) {
      const user = await this.usersRepository.findByEmailOrUsername(
        '', username,
      );

      if (!user) throw new AppError('User not found.', 404);

      const { password: _, ...userWithoutPassword } = user;

      return [userWithoutPassword];
    }
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
