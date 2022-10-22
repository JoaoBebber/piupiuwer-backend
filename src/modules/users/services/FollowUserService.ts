import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  followingId: string;
}

interface IResponse {
  status: 'Followed' | 'Unfollowed' | 'Not found';
  user: Omit<User, 'password'> | null;
}

@injectable()
class FollowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, followingId }: IRequest): Promise<IResponse> {
    let status: 'Followed' | 'Unfollowed';

    const followedUser = await this.usersRepository.findBy({
      key: 'id',
      value: followingId,
    });

    if (!followedUser) throw new AppError('User not found.', 404);

    const stillFollowing = await this.usersRepository.ensureFollowed(
      userId,
      followingId,
    );

    if (stillFollowing) {
      status = 'Unfollowed';

      await this.usersRepository.unfollow(userId, followingId);
    } else {
      status = 'Followed';

      await this.usersRepository.follow(userId, followingId);
    }

    const { password: _, ...followedUserWithoutPassword } = followedUser as User;

    return { status, user: followedUserWithoutPassword };
  }
}

export default FollowUserService;
