import { Prisma, Piu } from '@prisma/client';

import ICreatePiuDTO from '@modules/pius/dtos/ICreatePiuDTO';
import ILikePiuDTO from '@modules/pius/dtos/ILikePiuDTO';
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

  public async ensureLiked({ piuId, userId }: ILikePiuDTO): Promise<boolean> {
    const usersWhoLiked = await this.ormRepository.findUnique({
      where: { id: piuId },
    }).likedBy();

    if (usersWhoLiked.find((user) => user.id === userId)) return true;

    return false;
  }

  public async findById(id: string): Promise<Piu | null> {
    const piu = await this.ormRepository.findUnique({
      where: { id },
    });

    return piu;
  }

  public async like({ piuId, userId }: ILikePiuDTO): Promise<Piu> {
    const piu = await this.ormRepository.update({
      where: { id: piuId },
      data: {
        likedBy: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return piu;
  }

  public async list(): Promise<Piu[]> {
    const pius = await this.ormRepository.findMany();

    return pius;
  }

  public async unlike({ piuId, userId }: ILikePiuDTO): Promise<Piu> {
    const piu = await this.ormRepository.update({
      where: { id: piuId },
      data: {
        likedBy: {
          disconnect: {
            id: userId,
          },
        },
      },
    });

    return piu;
  }
}

export default piusRepository;
