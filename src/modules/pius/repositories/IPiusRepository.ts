import { Piu } from '@prisma/client';

import ICreatePiuDTO from '../dtos/ICreatePiuDTO';

interface IPiusRepository {
  create(data: ICreatePiuDTO): Promise<Piu>;
  list(): Promise<Piu[]>;
}

export default IPiusRepository;
