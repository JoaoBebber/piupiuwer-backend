import { container } from 'tsyringe';

import './providers';

// Users
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';
// Pius
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import PiusRepository from '@modules/pius/infra/prisma/repositories/PiusRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IPiusRepository>(
  'PiusRepository',
  PiusRepository,
);
