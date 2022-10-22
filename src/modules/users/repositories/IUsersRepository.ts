import { User } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindUserDTO from '../dtos/IFindUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  ensureFollowed(userId: string, followingId: string): Promise<boolean>;
  findBy(data: IFindUserDTO): Promise<User | null>;
  follow(userId: string, followingId: string): Promise<User | null>;
  list(): Promise<User[]>;
  unfollow(userId: string, followingId: string): Promise<User>;
}

export default IUsersRepository;
