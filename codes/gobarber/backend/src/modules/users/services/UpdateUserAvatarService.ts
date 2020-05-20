import path from 'path';
import * as fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Only authenticated user can change it', 401);
    }

    // del if already exist avatar
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // check status of the file
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
