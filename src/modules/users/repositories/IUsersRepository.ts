import { User } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  ensureFollowed(userId: string, followingId: string): Promise<boolean>;
  findByEmailOrUsername(email: string, username: string): Promise<User | null>;
  findByEmailWithRelations(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  follow(userId: string, followingId: string): Promise<User | null>;
  list(): Promise<User[]>;
  unfollow(userId: string, followingId: string): Promise<User>;
}

export default IUsersRepository;
