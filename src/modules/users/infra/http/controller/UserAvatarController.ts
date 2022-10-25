import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UploadAvatarService from '@modules/users/services/UploadAvatarService';

class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const uploadUserAvatar = container.resolve(UploadAvatarService);

    const updatedUser = await uploadUserAvatar.execute({
      userId: req.user.id,
      avatarFileName: req.file ? req.file.filename : '',
    });

    const { password: _, ...updatedUserWithoutPassword } = updatedUser;

    return res.json(updatedUserWithoutPassword);
  }
}

export default UserAvatarController;
