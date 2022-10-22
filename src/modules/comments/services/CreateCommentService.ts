import { Comment } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import IPiusRepository from '@modules/pius/repositories/IPiusRepository';

import AppError from '@shared/errors/AppError';

import ICreateCommentDTO from '../dtos/ICreateCommentDTO';
import ICommentsRepository from '../repositories/ICommentsRepository';

@injectable()
class CreateCommentService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,

    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute({
    authorId,
    piuId,
    content,
  }: ICreateCommentDTO): Promise<Comment> {
    const piu = await this.piusRepository.findById(piuId);

    if (!piu) throw new AppError('Piu not found.', 404);

    if (content === '' || content.length > 140) {
      throw new AppError('Invaild comment length.');
    }

    return this.commentsRepository.create({
      authorId,
      piuId,
      content,
    });
  }
}

export default CreateCommentService;
