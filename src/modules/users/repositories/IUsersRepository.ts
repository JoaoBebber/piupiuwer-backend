import { User } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  findByEmailWithRelations(email: string): Promise<User | null>;
  findByEmailOrUsername(email: string, username: string): Promise<User | null>;
  create(data: ICreateUserDTO): Promise<User>;
}

export default IUsersRepository;
