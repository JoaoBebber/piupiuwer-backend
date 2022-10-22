import { Comment } from '@prisma/client';

// Data Transfer Objects
import ICreateCommentDTO from '../dtos/ICreateCommentDTO';

interface ICommentsRepository {
  // General Methods
  create(data: ICreateCommentDTO): Promise<Comment>;
}

export default ICommentsRepository;
