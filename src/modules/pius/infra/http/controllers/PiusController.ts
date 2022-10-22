import { Request, Response } from 'express';
import { container } from 'tsyringe';

// Services
import CreatePiuService from '@modules/pius/services/CreatePiuService';
import DeletePiuService from '@modules/pius/services/DeletePiuService';
import FavoritePiuService from '@modules/pius/services/FavoritePiuService';
import LikePiuService from '@modules/pius/services/LikePiuService';
import ListPiusService from '@modules/pius/services/ListPiusService';

class PiusController {
  // General Requests
  public async create(req: Request, res: Response): Promise<Response> {
    const { content } = req.body;

    const piu = await container.resolve(CreatePiuService).execute({
      authorId: req.user.id,
      content,
    });

    return res.status(201).json(piu);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { piuId } = req.body;

    const piu = await container.resolve(DeletePiuService).execute(piuId);

    return res.json(piu);
  }

  public async list(_req: Request, res: Response): Promise<Response> {
    const pius = await container.resolve(ListPiusService).execute();

    return res.json(pius);
  }

  // Favorite Requests
  public async favorite(req: Request, res: Response): Promise<Response> {
    const { piuId } = req.body;

    const piu = await container.resolve(FavoritePiuService).execute({
      piuId,
      userId: req.user.id,
    });

    return res.json(piu);
  }

  // Like Requests
  public async like(req: Request, res: Response): Promise<Response> {
    const { piuId } = req.body;

    const piu = await container.resolve(LikePiuService).execute({
      piuId,
      userId: req.user.id,
    });

    return res.json(piu);
  }
}

export default PiusController;
