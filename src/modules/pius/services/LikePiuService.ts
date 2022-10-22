import { Piu } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import ILikePiuDTO from '../dtos/ILikePiuDTO';
import IPiusRepository from '../repositories/IPiusRepository';

@injectable()
class LikePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute({ piuId, userId }: ILikePiuDTO): Promise<Piu> {
    const piu = await this.piusRepository.like({
      piuId,
      userId,
    });

    return piu;
  }
}

export default LikePiuService;
