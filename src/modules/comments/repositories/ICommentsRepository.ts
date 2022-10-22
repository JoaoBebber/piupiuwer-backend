import { Comment } from '@prisma/client';

import ICreateCommentDTO from '../dtos/ICreateCommentDTO';

interface ICommentsRepository {
  create(data: ICreateCommentDTO): Promise<Comment>;
}

export default ICommentsRepository;
