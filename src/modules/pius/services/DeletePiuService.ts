import { Piu } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPiusRepository from '../repositories/IPiusRepository';

@injectable()
class DeletePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute(piuId: string): Promise<Piu> {
    const piu = await this.piusRepository.findById(piuId);

    if (!piu) throw new AppError('Piu not found.', 404);

    return this.piusRepository.delete(piuId);
  }
}

export default DeletePiuService;
