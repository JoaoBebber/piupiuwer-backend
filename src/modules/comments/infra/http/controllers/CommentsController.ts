import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCommentService from '@modules/comments/services/CreateCommentService';

class CommentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { piuId, content } = req.body;

    const createComment = container.resolve(CreateCommentService);

    const comment = await createComment.execute({
      authorId: req.user.id,
      piuId,
      content,
    });

    return res.json(comment);
  }
}

export default CommentsController;
