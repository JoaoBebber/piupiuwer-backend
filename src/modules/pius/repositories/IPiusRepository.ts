import { Piu } from '@prisma/client';

import ICreatePiuDTO from '../dtos/ICreatePiuDTO';
import IFavoritePiuDTO from '../dtos/IFavoritePiuDTO';
import ILikePiuDTO from '../dtos/ILikePiuDTO';

interface IPiusRepository {
  // General Methods
  create(data: ICreatePiuDTO): Promise<Piu>;
  findById(id: string): Promise<Piu | null>;
  list(): Promise<Piu[]>;

  // Favorite Methods
  ensureFavorited(data: IFavoritePiuDTO): Promise<boolean>;
  favorite(data: IFavoritePiuDTO): Promise<Piu>;
  unfavorite(data: IFavoritePiuDTO): Promise<Piu>;

  // Like Methods
  ensureLiked(data: ILikePiuDTO): Promise<boolean>;
  like(data: ILikePiuDTO): Promise<Piu>;
  unlike(data: ILikePiuDTO): Promise<Piu>;
}

export default IPiusRepository;
