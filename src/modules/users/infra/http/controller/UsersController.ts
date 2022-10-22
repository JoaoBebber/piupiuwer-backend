import { Request, Response } from 'express';
import { container } from 'tsyringe';

// Services
import CreateUserService from '@modules/users/services/CreateUserService';
import FollowUserService from '@modules/users/services/FollowUserService';
import ListUsersService from '@modules/users/services/ListUsersService';

export default class UserController {
  // General Requests
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      first_name,
      last_name,
      email,
      about,
      password,
      username,
    } = req.body;

    const user = await container.resolve(CreateUserService).execute({
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

    const users = await container.resolve(ListUsersService).execute(
      username as string,
    );

    return res.json(users);
  }

  // Follow Requests
  public async follow(req: Request, res: Response): Promise<Response> {
    const { followingId } = req.body;

    const followedUser = await container.resolve(FollowUserService).execute({
      userId: req.user.id,
      followingId: followingId as string,
    });

    return res.json(followedUser);
  }
}
