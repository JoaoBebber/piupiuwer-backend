import { User } from '@prisma/client';

// Data Transfer Objects
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindUserDTO from '../dtos/IFindUserDTO';

interface IUsersRepository {
  // General Methods
  create(data: ICreateUserDTO): Promise<User>;
  findBy(data: IFindUserDTO): Promise<User | null>;
  list(): Promise<User[]>;

  // Follow Methods
  ensureFollowed(userId: string, followingId: string): Promise<boolean>;
  follow(userId: string, followingId: string): Promise<User | null>;
  unfollow(userId: string, followingId: string): Promise<User>;
}

export default IUsersRepository;
