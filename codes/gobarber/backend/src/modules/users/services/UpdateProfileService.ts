import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    const checkUserEmail = await this.usersRepository.findByEmail(email);

    if (checkUserEmail && checkUserEmail.id !== user_id) {
      throw new AppError('Email already used', 401);
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        'You must fill the old password to update a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassowrd = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassowrd) {
        throw new AppError(
          'You must fill the old password correctly the don`t match',
        );
      }
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
