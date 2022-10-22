import { Piu } from '@prisma/client';

import ICreatePiuDTO from '../dtos/ICreatePiuDTO';
import ILikePiuDTO from '../dtos/ILikePiuDTO';

interface IPiusRepository {
  create(data: ICreatePiuDTO): Promise<Piu>;
  ensureLiked(data: ILikePiuDTO): Promise<boolean>;
  findById(id: string): Promise<Piu | null>;
  like(data: ILikePiuDTO): Promise<Piu>;
  list(): Promise<Piu[]>;
  unlike(data: ILikePiuDTO): Promise<Piu>;
}

export default IPiusRepository;
