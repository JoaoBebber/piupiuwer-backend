import { Piu } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
  authorId: string;
  content: string;
}

@injectable()
class CreatePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute({ authorId, content }: IRequest): Promise<Piu> {
    if (content === '' || content.length > 140) {
      throw new AppError('Invalid Piu length.');
    }

    return this.piusRepository.create({ authorId, content });
  }
}

export default CreatePiuService;
