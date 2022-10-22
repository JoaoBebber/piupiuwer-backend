import { Piu } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFavoritePiuDTO from '../dtos/IFavoritePiuDTO';
import IPiusRepository from '../repositories/IPiusRepository';

interface IResponse {
  operation: 'favorite' | 'unfavorite';
  piu: Piu;
}

@injectable()
class FavoritePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute({ piuId, userId }: IFavoritePiuDTO): Promise<IResponse> {
    let operation: 'favorite' | 'unfavorite';

    const piu = await this.piusRepository.findById(piuId);

    if (!piu) throw new AppError('Piu not found.', 404);

    const stillFavorited = await this.piusRepository.ensureFavorited({
      piuId,
      userId,
    });

    if (stillFavorited) {
      operation = 'unfavorite';

      await this.piusRepository.unfavorite({ piuId, userId });
    } else {
      operation = 'favorite';

      await this.piusRepository.favorite({ piuId, userId });
    }

    return { operation, piu };
  }
}

export default FavoritePiuService;
