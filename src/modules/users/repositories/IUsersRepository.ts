import { User } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  list(): Promise<User[]>;
  findByEmailWithRelations(email: string): Promise<User | null>;
  findByEmailOrUsername(email: string, username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  follow(userId: string, followingId: string): Promise<User | null>;
}

export default IUsersRepository;
