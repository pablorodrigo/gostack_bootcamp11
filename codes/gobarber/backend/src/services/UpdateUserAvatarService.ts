import { getRepository } from 'typeorm';
import path from 'path';
import * as fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';

interface Request {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  async execute({ userId, avatarFileName }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new Error('Only authenticated user can change it');
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

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
