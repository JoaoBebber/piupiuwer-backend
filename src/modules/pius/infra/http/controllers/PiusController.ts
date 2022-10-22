import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePiuService from '@modules/pius/services/CreatePiuService';
import LikePiuService from '@modules/pius/services/LikePiuService';
import ListPiusService from '@modules/pius/services/ListPiusService';

class PiusController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { content } = req.body;

    const createPiu = container.resolve(CreatePiuService);

    const piu = await createPiu.execute({ authorId: req.user.id, content });

    return res.status(201).json(piu);
  }

  public async like(req: Request, res: Response): Promise<Response> {
    const { piuId } = req.body;

    const likePiu = container.resolve(LikePiuService);

    const piu = await likePiu.execute({
      piuId,
      userId: req.user.id,
    });

    return res.json(piu);
  }

  public async list(_req: Request, res: Response): Promise<Response> {
    const listPius = container.resolve(ListPiusService);

    const pius = await listPius.execute();

    return res.json(pius);
  }
}

export default PiusController;
