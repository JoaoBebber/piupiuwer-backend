import { Request, Response } from 'express';
import { container } from 'tsyringe';

// Services
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  // General Requests
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const { user, token } = await container.resolve(AuthenticateUserService).execute({
      email,
      password,
    });

    return res.json({ user, token });
  }
}
