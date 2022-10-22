import { Piu } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import IPiusRepository from '@modules/pius/repositories/IPiusRepository';

@injectable()
class ListPiusService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute(): Promise<Piu[]> {
    return this.piusRepository.list();
  }
}

export default ListPiusService;
