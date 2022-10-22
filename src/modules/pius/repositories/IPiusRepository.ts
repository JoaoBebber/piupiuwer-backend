import { Piu } from '@prisma/client';

import ICreatePiuDTO from '../dtos/ICreatePiuDTO';
import ILikePiuDTO from '../dtos/ILikePiuDTO';

interface IPiusRepository {
  create(data: ICreatePiuDTO): Promise<Piu>;
  like(data: ILikePiuDTO): Promise<Piu>;
  list(): Promise<Piu[]>;
}

export default IPiusRepository;
