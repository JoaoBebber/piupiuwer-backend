import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePiuService from '@modules/pius/services/CreatePiuService';

class PiusController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { content } = req.body;

    const createPiu = container.resolve(CreatePiuService);

    const piu = await createPiu.execute({ authorId: req.user.id, content });

    return res.status(201).json(piu);
  }
}

export default PiusController;
