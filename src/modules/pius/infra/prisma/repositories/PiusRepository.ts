import { Prisma, Piu } from '@prisma/client';

import ICreatePiuDTO from '@modules/pius/dtos/ICreatePiuDTO';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';

import prisma from '@shared/infra/prisma/client';

class piusRepository implements IPiusRepository {
  private ormRepository: Prisma.PiuDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.piu;
  }

  public async create(data: ICreatePiuDTO): Promise<Piu> {
    const piu = await this.ormRepository.create({ data });

    return piu;
  }
}

export default piusRepository;
