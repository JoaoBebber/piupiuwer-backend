import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      first_name,
      last_name,
      email,
      about,
      password,
      username,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      first_name,
      last_name,
      email,
      about,
      password,
      username,
    });

    user.password = '###';

    return res.status(201).json(user);
  }
}
