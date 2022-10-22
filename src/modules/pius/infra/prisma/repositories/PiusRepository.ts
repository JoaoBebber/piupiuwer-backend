import { Prisma, Piu } from '@prisma/client';

// Data Transfer Objects
import ICreatePiuDTO from '@modules/pius/dtos/ICreatePiuDTO';
import IFavoritePiuDTO from '@modules/pius/dtos/IFavoritePiuDTO';
import ILikePiuDTO from '@modules/pius/dtos/ILikePiuDTO';

// Repositories
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';

// Prisma Client
import prisma from '@shared/infra/prisma/client';

class piusRepository implements IPiusRepository {
  private ormRepository: Prisma.PiuDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.piu;
  }

  // General Methods
  public async create(data: ICreatePiuDTO): Promise<Piu> {
    return this.ormRepository.create({ data });
  }

  public async delete(piuId: string): Promise<Piu> {
    return this.ormRepository.delete({ where: { id: piuId } });
  }

  public async findById(id: string): Promise<Piu | null> {
    return this.ormRepository.findUnique({
      where: { id },
    });
  }

  public async list(): Promise<Piu[]> {
    return this.ormRepository.findMany();
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
    return this.ormRepository.update({
      where: { id: piuId },
      data: {
        favoritedBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  public async unfavorite({ piuId, userId }: IFavoritePiuDTO): Promise<Piu> {
    return this.ormRepository.update({
      where: { id: piuId },
      data: {
        favoritedBy: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
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
    return this.ormRepository.update({
      where: { id: piuId },
      data: {
        likedBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  public async unlike({ piuId, userId }: ILikePiuDTO): Promise<Piu> {
    return this.ormRepository.update({
      where: { id: piuId },
      data: {
        likedBy: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  }
}

export default piusRepository;
