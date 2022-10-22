import { Request, Response } from 'express';
import { container } from 'tsyringe';

// Services
import CreateCommentService from '@modules/comments/services/CreateCommentService';

class CommentsController {
  // General Requests
  public async create(req: Request, res: Response): Promise<Response> {
    const { piuId, content } = req.body;

    const comment = await container.resolve(CreateCommentService).execute({
      authorId: req.user.id,
      piuId,
      content,
    });

    return res.json(comment);
  }
}

export default CommentsController;
