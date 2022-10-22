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
    const pius = await this.piusRepository.list();

    return pius;
  }
}

export default ListPiusService;
