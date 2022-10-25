import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import s3 from '@config/s3';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

@injectable()
class UploadAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findBy({
      key: 'id',
      value: userId,
    });

    if (user?.avatar) {
      const [, oldAvatarKey] = user.avatar.split('amazonaws.com/');

      s3.deleteObject({
        Bucket: process.env.BUCKET_NAME as string,
        Key: oldAvatarKey,
      });
    }

    const avatarKey = `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${avatarFileName}`;

    return this.usersRepository.updateAvatarKey({
      userId,
      avatarKey,
    });
  }
}

export default UploadAvatarService;
