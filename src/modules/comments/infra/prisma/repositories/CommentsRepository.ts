import { Prisma, Comment } from '@prisma/client';

// Data Transfer Objects
import ICreateCommentDTO from '@modules/comments/dtos/ICreateCommentDTO';

// Repositories
import ICommentsRepository from '@modules/comments/repositories/ICommentsRepository';

import prisma from '@shared/infra/prisma/client';

class CommentsRepository implements ICommentsRepository {
  private ormRepository: Prisma.CommentDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.comment;
  }

  // General Methods
  public async create(data: ICreateCommentDTO): Promise<Comment> {
    return this.ormRepository.create({ data });
  }
}

export default CommentsRepository;
