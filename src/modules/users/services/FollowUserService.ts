import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  followingId: string;
}

@injectable()
class FollowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, followingId }: IRequest): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersRepository.follow(userId, followingId);

    if (!user) throw new AppError('User not found.', 404);

    const followedUser = await this.usersRepository.findById(followingId);

    const { password: _, ...followedUserWithoutPassword } = followedUser as User;

    return followedUserWithoutPassword;
  }
}

export default FollowUserService;
