import { Prisma, User } from '@prisma/client';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindUserDTO from '@modules/users/dtos/IFindUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import prisma from '@shared/infra/prisma/client';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = await this.ormRepository.create({ data });

    return user;
  }

  public async ensureFollowed(userId: string, followingId: string): Promise<boolean> {
    const followedUsers = await this.ormRepository.findUnique({
      where: { id: userId },
    }).following();

    if (followedUsers.find((user) => user.id === followingId)) {
      return true;
    }

    return false;
  }

  public async findBy({ key, value }: IFindUserDTO): Promise<User | null> {
    if (key === 'email') {
      return this.ormRepository.findUnique({
        where: { email: value },
      });
    } if (key === 'id') {
      return this.ormRepository.findUnique({
        where: { id: value },
      });
    } if (key === 'username') {
      return this.ormRepository.findUnique({
        where: { username: value },
      });
    }

    return null;
  }

  public async follow(userId: string, followingId: string): Promise<User | null> {
    const followed = await this.ormRepository.update({
      where: { id: userId },
      data: {
        following: {
          connect: {
            id: followingId,
          },
        },
      },
    });

    return followed;
  }

  public async list(): Promise<User[]> {
    const users = await this.ormRepository.findMany();

    return users;
  }

  public async unfollow(userId: string, followingId: string): Promise<User> {
    const unfollowed = await this.ormRepository.update({
      where: { id: userId },
      data: {
        following: {
          disconnect: {
            id: followingId,
          },
        },
      },
    });

    return unfollowed;
  }
}
