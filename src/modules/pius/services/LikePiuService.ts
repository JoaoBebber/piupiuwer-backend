import { Piu } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILikePiuDTO from '../dtos/ILikePiuDTO';
import IPiusRepository from '../repositories/IPiusRepository';

interface IResponse {
  operation: 'like' | 'unlike';
  piu: Piu;
}

@injectable()
class LikePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute({ piuId, userId }: ILikePiuDTO): Promise<IResponse> {
    let operation: 'like' | 'unlike';

    const piu = await this.piusRepository.findById(piuId);

    if (!piu) throw new AppError('Piu not found.', 404);

    const stillLiked = await this.piusRepository.ensureLiked({ piuId, userId });

    if (stillLiked) {
      operation = 'unlike';

      await this.piusRepository.unlike({ piuId, userId });
    } else {
      operation = 'like';

      await this.piusRepository.like({ piuId, userId });
    }

    return { operation, piu };
  }
}

export default LikePiuService;
