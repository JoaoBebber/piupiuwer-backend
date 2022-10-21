import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import FollowUserService from '@modules/users/services/FollowUserService';

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

    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json(userWithoutPassword);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const { username } = req.query;

    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute(username as string);

    return res.json(users);
  }

  public async follow(req: Request, res: Response): Promise<Response> {
    const { followingId } = req.body;

    const followUser = container.resolve(FollowUserService);

    const followedUser = await followUser.execute({
      userId: req.user.id,
      followingId: followingId as string,
    });

    return res.json(followedUser);
  }
}
