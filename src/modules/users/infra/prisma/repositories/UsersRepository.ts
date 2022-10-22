import { Prisma, User } from '@prisma/client';

// Data Transfer Objects
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindUserDTO from '@modules/users/dtos/IFindUserDTO';

// Repositories
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

// Prisma Client
import prisma from '@shared/infra/prisma/client';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.user;
  }

  // General Methods
  public async create(data: ICreateUserDTO): Promise<User> {
    return this.ormRepository.create({ data });
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

  public async list(): Promise<User[]> {
    return this.ormRepository.findMany();
  }

  // Follow Methods
  public async ensureFollowed(userId: string, followingId: string): Promise<boolean> {
    const followedUsers = await this.ormRepository.findUnique({
      where: { id: userId },
    }).following();

    if (followedUsers.find((user) => user.id === followingId)) return true;

    return false;
  }

  public async follow(userId: string, followingId: string): Promise<User | null> {
    return this.ormRepository.update({
      where: { id: userId },
      data: {
        following: {
          connect: {
            id: followingId,
          },
        },
      },
    });
  }

  public async unfollow(userId: string, followingId: string): Promise<User> {
    return this.ormRepository.update({
      where: { id: userId },
      data: {
        following: {
          disconnect: {
            id: followingId,
          },
        },
      },
    });
  }
}
