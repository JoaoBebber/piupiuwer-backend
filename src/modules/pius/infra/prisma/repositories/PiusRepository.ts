import { Prisma, Piu } from '@prisma/client';

import ICreatePiuDTO from '@modules/pius/dtos/ICreatePiuDTO';
import IFavoritePiuDTO from '@modules/pius/dtos/IFavoritePiuDTO';
import ILikePiuDTO from '@modules/pius/dtos/ILikePiuDTO';

import IPiusRepository from '@modules/pius/repositories/IPiusRepository';

import prisma from '@shared/infra/prisma/client';

class piusRepository implements IPiusRepository {
  private ormRepository: Prisma.PiuDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.piu;
  }

  // General Methods
  public async create(data: ICreatePiuDTO): Promise<Piu> {
    const piu = await this.ormRepository.create({ data });

    return piu;
  }

  public async findById(id: string): Promise<Piu | null> {
    const piu = await this.ormRepository.findUnique({
      where: { id },
    });

    return piu;
  }

  public async list(): Promise<Piu[]> {
    const pius = await this.ormRepository.findMany();

    return pius;
  }

  // Favorite Methods
  public async ensureFavorited({
    piuId,
    userId,
  }: IFavoritePiuDTO): Promise<boolean> {
    const usersWhoFavorited = await this.ormRepository.findUnique({
      where: { id: piuId },
    }).favoritedBy();

    if (usersWhoFavorited.find((user) => user.id === userId)) return true;

    return false;
  }

  public async favorite({ piuId, userId }: IFavoritePiuDTO): Promise<Piu> {
    const piu = await this.ormRepository.update({
      where: { id: piuId },
      data: {
        favoritedBy: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return piu;
  }

  public async unfavorite({ piuId, userId }: IFavoritePiuDTO): Promise<Piu> {
    const piu = await this.ormRepository.update({
      where: { id: piuId },
      data: {
        favoritedBy: {
          disconnect: {
            id: userId,
          },
        },
      },
    });

    return piu;
  }

  // Like Methods
  public async ensureLiked({ piuId, userId }: ILikePiuDTO): Promise<boolean> {
    const usersWhoLiked = await this.ormRepository.findUnique({
      where: { id: piuId },
    }).likedBy();

    if (usersWhoLiked.find((user) => user.id === userId)) return true;

    return false;
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
